import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classnames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用input */
  disabled?: boolean
  /**设置input大小 */
  size?: InputSize
  /**添加图标， 在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 */
  prepend?: string | ReactElement
  /**添加后缀 */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = props => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props

  const cnames = classnames('free-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-apped': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  // 防止值冲突
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="free-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input 
        className="free-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="free-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;