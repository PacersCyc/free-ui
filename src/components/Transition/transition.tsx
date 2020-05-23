import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'

// 利用wrapper属性包裹子元素防止覆盖子元素本身transition
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = props => {
  const {
    classNames,
    children,
    animation,
    wrapper,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {
        wrapper ? <div>{children}</div> : children
      }
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition