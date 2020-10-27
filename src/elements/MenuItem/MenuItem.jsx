/** @module MenuItem
 *  @class MenuItem
 *  @since 2020.10.27, 03:05
 *  @changed 2020.10.27, 03:06
 */

import React from 'react'
// import PropTypes from 'prop-types'
// import connect from 'react-redux/es/connect/connect'
import { cn } from '@bem-react/classname'

import FormItemHOC from 'forms/FormItemHOC'

import './MenuItem.pcss'

const cnMenuItem = cn('MenuItem')

class MenuItem extends React.Component /** @lends @MenuItem.prototype */ {

  onClick = () => {
  }

  getClassName() {
    const {
      id,
      checkable,
      checked,
      disabled,
      // title,
      // onClick,
    } = this.props
    const className = cnMenuItem({
      id,
      checkable,
      checked,
      disabled,
    }, [this.props.className])
    return className
  }

  renderContent() {
    const {
      children,
      text,
      // title,
      // val,
    } = this.props
    return children || text
  }

  render() {

    const {
      id,
      // onClick,
      setDomRef, // From FormItemHOC
    } = this.props

    const renderProps = {
      id,
      className: this.getClassName(),
      onClick: this.onClick,
      ref: setDomRef, // Init ref for FormItemHOC
    }

    const content = this.renderContent()

    return (
      <div {...renderProps}>
        {content}
      </div>
    )
  }

}

export default FormItemHOC({ hoverable: true })(MenuItem)

