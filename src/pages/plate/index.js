import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeHeaderTitleAction } from '../../components/header/store'
import styles from './index.scss'
import {
  getJrjhPlateSort
} from '../detail/store/actionCreator'

class StateDetail extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      showUb: true
    }
  }
  componentDidMount() {
    this.props.changeHeaderTitle('板块个股', this.props)
  }
  render() {
    const { stockPlate, plateSort, getJrjhPlateSort } = this.props
    const stockList = stockPlate.toJS()
    return (
      <div id="views" styleName="plate">
        <ol>
          <li></li>
          <li onClick={() => {getJrjhPlateSort(stockList, plateSort)}}>涨幅<i styleName={plateSort ? '' : 'up'}></i></li>
          <li>最新</li>
        </ol>
        {
          stockList.map(item => {
            return <ul key={item.symbol}>
              <li>
                <h3>{item.name}</h3>
                <p>{item.symbol}</p>
              </li>
              <li className={item.rate > 0 ? 'color-red' : 'color-green'}>
                {item.rate.includes('100') ? '--' : item.rate}%
              </li>
              <li className={item.rate > 0 ? 'color-red' : 'color-green'}>
                {item.lastPrice}
              </li>
            </ul>
          })
        }        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stockPlate: state.getIn(['detail', 'stockPlate']),
  plateSort: state.getIn(['detail', 'plateSort'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  },
  getJrjhPlateSort(list, flag) {
    list.sort((a, b) => {
      return flag ? a.rate - b.rate : b.rate - a.rate
    })
    dispatch(getJrjhPlateSort(list))
  }
})

const option = {'allowMultiple': true}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModule(StateDetail, styles, option)))
