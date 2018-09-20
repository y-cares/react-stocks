import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeHeaderTitleAction } from '../../components/header/store'
import styles from './index.scss'
import {
  getJrjhStockMsg,
  getJrjhStockData,
  getJrjhStockItem,
  getJrjhStockPlate
} from './store/actionCreator'

class Detail extends PureComponent{
  componentDidMount() {
    const {id, index} = this.props.match.params
    const { changeHeaderTitle, getJrjhStockMsg, getJrjhStockData } = this.props
    changeHeaderTitle('主题选股', this.props)
    getJrjhStockMsg(id)
    getJrjhStockData(id, index)
  }
  goStockDetail (item) {
    const { history, getJrjhStockItem } = this.props
    history.push('/news')
    getJrjhStockItem(item)
  }
  goStockPlate (item) {
    const { history, getJrjhStockPlate } = this.props
    history.push('/plate')
    getJrjhStockPlate(item)
  }
  render() {
    const { stockMsg, stockData } = this.props
    const stockMsgList = stockMsg.toJS()
    const stockDataList = stockData.toJS()
    const articleList = stockMsgList.articleList || []
    const rateShow = (rate) => {
      if (rate > 0) {
        return `+${rate}`
      } else {
        return `${rate}`
      }
    }
    return (
      <div id="views">
        <div styleName="state-header">
          <h3>{stockMsgList.subjTitle}</h3>
          <p>{stockMsgList.subjDesc}</p>  
        </div>
        <div styleName="state-list">
          <h3>板块龙头<span onClick={() => {this.goStockPlate(stockDataList)}}>全部概念股</span></h3>
          <div>
            {
              stockDataList.map((item, index) => {
                if (index < 2) return (
                  <ul key={item.symbol}>
                    <li>
                      <h4>{item.name}</h4>
                      <p>{item.symbol}</p>
                    </li>
                    <li styleName={item.rate > 0 ? 'color-red' : 'color-green'}>{rateShow(item.rate)}%</li>
                  </ul>
                )
              })
            }
          </div>
        </div>
        <div styleName="state-container">
          <h3>触发理由</h3>
          <ul>
            {
              articleList.map(item => {
                return (
                  <li key={item.id} onClick={() => {this.goStockDetail(item)}}>
                    <h4 styleName={(item.content && item.content != '') ? 'title-bold': ''}>{item.title}</h4>
                    <span>{item.createdAt}</span>
                    <p>{item.summary.split('。')[1]}</p>
                    <ol>
                      {
                        JSON.parse(item.stocks).map((st, id) => {
                          return id < 2 && <li key={st.symbol}>{st.name}
                            <i className={st.rate > 0 ? 'color-red' : 'color-green'}>{st.rate.includes('100') ? '--' : st.rate}%</i>
                          </li>
                        })
                      }
                    </ol>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stockMsg: state.getIn(['detail', 'stockMsg']),
  stockData: state.getIn(['detail', 'stockData'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  },
  getJrjhStockMsg(subId) {
    dispatch(getJrjhStockMsg(subId))
  },
  getJrjhStockData(subId, index) {
    dispatch(getJrjhStockData(subId, index))
  },
  getJrjhStockItem(data) {
    dispatch(getJrjhStockItem(data))
  },
  getJrjhStockPlate(data) {
    dispatch(getJrjhStockPlate(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModule(Detail, styles)))
