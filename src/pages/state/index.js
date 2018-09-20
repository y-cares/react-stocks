import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeHeaderTitleAction } from '../../components/header/store'
import styles from './index.scss'

class State extends PureComponent{
  componentDidMount() {
    this.props.changeHeaderTitle('形态选股', this.props)
  }
  render() {
    return (
      <div>形态选股</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  }
})

const option = {'allowMultiple': true}
export default connect(null, mapDispatchToProps)(withRouter(CSSModule(State, styles, option)))
