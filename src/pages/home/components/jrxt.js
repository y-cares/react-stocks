import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CSSModule from 'react-css-modules'
import styles from '../index.scss'
import JrxtItem from './jrxtItem'
import {
  getStateList,
  getStateAction
} from '../store/actionCreator'

class Jrxt extends PureComponent{
  componentDidMount() {
    this.props.getStateList()
  }
  render() {
    const { stateOnData, stateOffData, focusStock } = this.props
    const stateOnList = stateOnData.toJS()
    const stateOffList = stateOffData.toJS()
    return (
      <div styleName={("panel jtxt-panel")}>
        <div styleName="panel-title">
          <h3>今日形态</h3>
          <p>11-11 11:11 更新</p>
          <Link to="/" onClick={() => alert('不想写了，无聊...')}>我的关注</Link>
        </div>
        <div styleName="jtxt-root">
          {
            stateOnList.map((item, index) => {
              return <JrxtItem
                  {...this.props}
                  key={item.sortId} 
                  item={item}
                  focusStock = {() => focusStock(index, item.isConcern, stateOnList, stateOffList)}/>
            })
          }
        </div>
        <div styleName="jtxt-root">
          {
            stateOffList.map((item, index) => {
              if (item.stockList.length > 0) {
                return <JrxtItem
                  {...this.props}
                  key={item.sortId} 
                  item={item}
                  focusStock = {() => focusStock(index, item.isConcern, stateOffList, stateOnList)}/>
              }
            })
          }
        </div>
        {/* <Link to="/state/2"> */}
          <button onClick={() => alert('不想写了，无聊...')} styleName="look-more">全部形态</button>
        {/* </Link> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stateOnData: state.getIn(['home', 'stateOnData']),
  stateOffData: state.getIn(['home', 'stateOffData'])
})

const mapDispatchToProps = dispatch => ({
  getStateList() {
    dispatch(getStateList())
  },
  focusStock(index, isConcern, arr, arr2) {
    arr[index].isConcern = isConcern === '1' ? '0' : '1'
    const result = [...arr, ...arr2]
    const onResult = result.filter(item => item.isConcern === '1')
    const offResult = result.filter(item => item.isConcern === '0')
    dispatch(getStateAction(onResult, offResult))
  }
})

const option = {'allowMultiple': true}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModule(Jrxt, styles, option))
