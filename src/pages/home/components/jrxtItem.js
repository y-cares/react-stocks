import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect }  from 'react-redux'
import styles from '../index.scss'
import {
  getStateItemAction
} from '../store/actionCreator'


class JrxtItem extends PureComponent{
  focusStockBtn(e) {
    const { item, focusStock, history, getStateItem } = this.props
    if (e.target.nodeName === 'BUTTON') {
      focusStock()
    } else {
      history.push('stateDetail')
      getStateItem(item)
    }
  }
  render() {
    const { item } = this.props
    const rateShow = (rate) => {
      return rate.includes('100') ? '--' : rate > 0 ? `+${rate}%` : `${rate}%`
    }
    return (
      <div onClick={(e) => this.focusStockBtn( e)}>
        <h3>{item.pattern_name.split('-')[0]}
          <button 
            styleName={item.isConcern === '0' ? '' : 'on-btn'}
            >{item.isConcern === '0' ? '关注' : '已关注'}</button>
        </h3>
        <ul>
          <li>指标属性：<i styleName={item.bs_type === '看多' ? 'color-red' : 'color-green'}>{item.bs_type}</i></li>
          <li>后1日平均涨幅：<i styleName={item.pattern1Rate > 0 ? 'color-red' : 'color-green'}>{item.pattern1Rate}%</i></li>
          <li>近30日出现：<i styleName={item.day30_num > 0 ? 'color-red' : 'color-green'}>{item.day30_num}次</i></li>
          <li>后5日平均涨幅：<i styleName={item.pattern5Rate > 0 ? 'color-red' : 'color-green'}>{item.pattern5Rate}%</i></li>
        </ul>
        <ol>
          {
            item.stockList.map((list, index) => {
              return index < 2 && <li key={list.stock_code}>
                {list.stockName}
                <span styleName={list.rate > 0 ? 'color-red' : 'color-green'}>{rateShow(list.rate)}</span>
              </li>
            })
          }
        </ol>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStateItem(data) {
    dispatch(getStateItemAction(data))
  }
})

const option = {'allowMultiple': true}
export default connect(null, mapDispatchToProps)(CSSModule(JrxtItem, styles, option))
