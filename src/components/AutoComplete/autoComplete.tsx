import React, { FC, useState, useEffect, useRef, ChangeEvent, ReactElement, KeyboardEvent } from 'react'
import classnames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside';

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHightlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHightlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item)
    triggerSearch.current = false
  }

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length
    }
    setHightlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 38:
        highlight(highlightIndex - 1)
        break;
      case 40:
        highlight(highlightIndex + 1)
        break;
      case 27:
        setSuggestions([])
        break;
      default:
        break;
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            const cnames = classnames('suggestion-item', {
              'item-highlighted': index === highlightIndex
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div className="free-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {
        loading && <ul><Icon icon="spinner" spin /></ul>
      }
      {
        suggestions.length > 0 && generateDropdown()
      }
    </div>
  )
}

export default AutoComplete;