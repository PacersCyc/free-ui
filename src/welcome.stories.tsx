import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome Page', module)
  .add('Welcome', () => {
    return (
      <>
        <h1>欢迎来到cyc-free-ui组件库</h1>
        <p>一套轻量react + typescript打造的组件库</p>
        <h3>Get start</h3>
        <code>
          npm install cyc-free-ui --save
        </code>
      </>
    )
  }, { info: { disable: true } })