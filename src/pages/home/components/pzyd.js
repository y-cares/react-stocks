import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModule from 'react-css-modules'
import { Link } from 'react-router-dom'
import styles from '../index.scss'
import PzydItem from '../../../components/pzydItem'
import {
  getPzydList,
  showMoreNewsAction
} from '../store/actionCreator'

class Pzyd extends PureComponent {
  componentDidMount() {
    this.props.getPzydList()
  }
  render() {
    const { pzydData, showMoreNews } = this.props
    const pzydList = pzydData.toJS()
    return (
      <div styleName={("panel pzyd-panel")}>
        <div styleName="panel-title">
          <h3>盘中异动</h3>
          <p>11-11 11:11 更新</p>
        </div>
        <ul>
          {
            pzydList.map((item, index) => {
              if (index < 2) return (
                <PzydItem 
                  key={item.id}
                  index={index}
                  item={item}
                  showMoreNews={() => showMoreNews(index, item.showMore)}/>
              )
            })
          }
        </ul>
        <Link to="move">
          <button styleName="look-more">全部盘中异动</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pzydData: state.getIn(['home', 'pzydData'])
})

const mapDispatchToProps = dispatch => ({
  getPzydList() {
    dispatch(getPzydList())
  },
  showMoreNews(index, flag) {
    dispatch(showMoreNewsAction(index, flag))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModule(Pzyd, styles, {'allowMultiple': true}));
