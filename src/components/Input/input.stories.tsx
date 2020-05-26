import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Input } from './input'

library.add(fas)

/**
 * 通用input组件
 * 
 */
const ControlledInput = () => {
  const [value, setValue] = useState()
  return <Input value={value} onChange={e => setValue(e.target.value)} />
}

const defaultInput = () => (
  <Input
    style={{
      width: 300
    }}
    placeholder="placeholder"
    onChange={action('onChanged')}
  />
)

const disabledInput = () => (
  <Input
    style={{
      width: 300
    }}
    placeholder="disabled"
    disabled
  />
)

const iconInput = () => (
  <Input
    style={{
      width: 300
    }}
    placeholder="icon"
    icon="search"
  />
)

const sizeInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{ width: '300px' }}
      placeholder="small size"
      size="sm"
    />
  </>
)

const pandInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{ width: '300px' }}
      defaultValue="google"
      append=".com"
    />
  </>
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('受控input', ControlledInput)
  .add('禁用的input', disabledInput)
  .add('带icon的input', iconInput)
  .add('不同大小的input', sizeInput)
  .add('带前后缀的input', pandInput)