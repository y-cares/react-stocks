import React, { Component } from 'react'
import CSSModule from 'react-css-modules'
import styles from './index.scss'

const loading = () => {
  return (
    <div styleName="load">
      <span></span>
      <p>正在加载中<i>...</i></p>
    </div>
  )
}

export default CSSModule(loading, styles)