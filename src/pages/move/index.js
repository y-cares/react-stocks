import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './index.scss'
import { changeHeaderTitleAction } from '../../components/header/store'
import PzydItem from '../../components/pzydItem'
import {
  showMoreNewsAction
} from '../home/store/actionCreator'

class Move extends PureComponent{
  componentDidMount() {
    this.props.changeHeaderTitle('盘中异动', this.props)
  }
  render() {
    const { pzydData, showMoreNews } = this.props
    const pzydList = pzydData.toJS()
    return (
      <div id="views">
        <div styleName="pzyd-time">2018-11-11 星期日</div>
        <ul styleName="pzyd-container">
          {
            pzydList.map((item, index) => {
              return <PzydItem
                key={item.id}
                index={index}
                item={item}
                showMoreNews={() => showMoreNews(index, item.showMore)}/>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pzydData: state.getIn(['home', 'pzydData'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  },
  showMoreNews(index, flag) {
    dispatch(showMoreNewsAction(index, flag))
  }
})

const option = {'allowMultiple': true}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModule(Move, styles, option)))
