import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeHeaderTitleAction } from '../../components/header/store'
import styles from './index.scss'

class StateDetail extends PureComponent{
  componentDidMount() {
    this.props.changeHeaderTitle(this.props.stateItem.get('pattern_name') || '形态选股', this.props)
  }
  render() {
    const stateItem = this.props.stateItem.toJS()
    return (
      <div id="views" styleName="state-page">
        <div styleName="state-header">
          <h3>形态名称</h3>
          <p>{stateItem.pattern_name.split('-')[0]}
            <span styleName={stateItem.bs_type === '看空' ? 'green-icon' : 'red-icon'}>
              <i></i>{stateItem.bs_type}指标</span>
          </p>
          <ul>
            <li>
              <h3>近30日出现</h3>
              <p>{stateItem.day30_num}次</p>
            </li>
            <li>
              <h3>后1日平均涨跌</h3>
              <p className={stateItem.pattern1Rate <= 0 ? 'color-green' : 'color-red'}>{stateItem.pattern1Rate}%</p>
            </li>
            <li>
              <h3>后5日平均涨跌</h3>
              <p className={stateItem.pattern5Rate <= 0 ? 'color-green' : 'color-red'}>{stateItem.pattern5Rate}%</p>
            </li>
          </ul>
          <h3>形态说明</h3>
          <p>{stateItem.pattern_detailed}</p>
        </div>
        <div styleName="state-container">
          <h3>{stateItem.pattern_name.split('-')[0]}</h3>
          <ol>
            <li>股票名称</li>
            <li>最新</li>
            <li>涨幅</li>
          </ol>
          {
            stateItem.stockList.map(item => {
              return <ul key={item.stock_code}>
                <li>
                  <h4>{item.stockName}</h4>
                  <p>{item.stock_code}</p>
                </li>
                <li>{item.lastPrice}</li>
                <li className={item.rate <= 0 ? 'color-green' : 'color-red'}>{item.rate.includes('100') ? '--' : item.rate}%</li>
              </ul>
            })
          }
        </div>
        <p styleName="no-more">—— 没有更多了 ——</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stateItem: state.getIn(['home', 'stateItem'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  }
})

const option = {'allowMultiple': true}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModule(StateDetail, styles, option)))
