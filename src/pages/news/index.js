import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeHeaderTitleAction } from '../../components/header/store'
import styles from './index.scss'

class StateDetail extends PureComponent{
  componentDidMount() {
    this.props.changeHeaderTitle('内容详情', this.props)
  }
  render() {
    const  stockItem  = this.props.stockItem.toJS()
    return (
      <div id="views" styleName="news">
        <h2>{stockItem.title}</h2>
        <p>{stockItem.createdAt}</p>
        <div dangerouslySetInnerHTML={{ __html: stockItem.content }}></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stockItem: state.getIn(['detail', 'stockItem'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  }
})

const option = {'allowMultiple': true}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModule(StateDetail, styles, option)))
