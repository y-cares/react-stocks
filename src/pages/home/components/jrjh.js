import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CSSModule from 'react-css-modules'
import styles from '../index.scss'
import {
  getJrjhList
} from '../store/actionCreator'

class Jrjh extends PureComponent{
  componentDidMount() {
    this.props.getJrjhList()
  }
  render() {
    const { news, jrjhData } = this.props
    const jrjhList = jrjhData.toJS()
    const rateShow = (rate) => {
      if (rate.includes('100')) {
        return `--`
      }else if (rate > 0) {
        return `+${rate}%`
      } else {
        return `${rate}%`
      }
    }
    return (
      <div styleName={("panel jtjh-panel")}>
        <div styleName="panel-title">
          <h3>今日机会</h3>
          <p>11-11 11:11 更新</p>
        </div>
        <div styleName="jrjh-news">
          <h3>机会点评</h3>
          <p>{news}</p>
          <span></span>
        </div>
        <ul>
          {
            jrjhList.map((item, index) => {
              return (
                <li key={item.subjId}>
                  <Link to={`/detail/${item.subjId}/${index}`}>
                    <h4>
                      <i>{index + 1}</i>
                      {item.title}
                      <span>{item.time}</span>
                    </h4>
                    <p>{item.news}</p>
                    <ol>
                      {
                        item.stockList.map(list => {
                          return (
                            <li key={list.symbol}>{list.name}
                              <span 
                                styleName={list.rate > 0 ? 'color-red' : 'color-green'}>
                                { rateShow(list.rate) }
                              </span>
                            </li>
                          )
                        })
                      }
                    </ol>
                    </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.getIn(['home', 'jrjhNews']),
  jrjhData: state.getIn(['home', 'jrjhData'])
})

const mapDispatchToProps = dispatch => ({
  getJrjhList() {
    dispatch(getJrjhList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModule(Jrjh, styles, {'allowMultiple': true}))