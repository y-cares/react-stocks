import ReactDOM from 'react-dom'
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.scss'
// import Header from '../../components/header'
import { changeHeaderTitleAction } from '../../components/header/store'
import Nav from './components/nav'
import Pzyd from './components/pzyd'
import Jrjh from './components/jrjh'
import Jrxt from './components/jrxt'
import {
  changeNavIndex,
  getComponentOffsetTop
} from './store/actionCreator'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      componentOffsetTop: []
    }
  }
  componentDidMount() {
    const { changeHeaderTitle, getComponentOffsetTop } = this.props
    changeHeaderTitle('超级选股', this.props)

    setTimeout(() => {
      const pzydOffsetTop = ReactDOM.findDOMNode(this._pzyd).offsetTop
      const jrjhOffsetTop = ReactDOM.findDOMNode(this._jrjh).offsetTop - pzydOffsetTop
      const jrxtOffsetTop = ReactDOM.findDOMNode(this._jrxt).offsetTop - pzydOffsetTop
      const data = [0, jrjhOffsetTop, jrxtOffsetTop]
      getComponentOffsetTop(data)
      console.log(data)
    }, 20)
  }
  componentDidUpdate() {
    const { navIndex, componentOffsetTop } = this.props
    const componentTopList = componentOffsetTop.toJS()
    const top = componentTopList[navIndex]
    this._home.scrollTo(0, top)
  }
  homeScroll(e) {
    const scrollTop = Math.ceil(e.target.scrollTop)
    const { changeNavTitle, componentOffsetTop } = this.props
    const componentTopList = componentOffsetTop.toJS()
    const index = scrollTop < componentTopList[1] ? 0 :
    scrollTop >= componentTopList[1] && scrollTop < componentTopList[2] ? 1 : 2
    changeNavTitle(index)
  }
  render() {
    return (
      <Fragment>
        <Nav />
        <div id="views"
          styleName="home"
          ref={el => this._home = el}
          onScroll={(e) => this.homeScroll(e)}>
          <div styleName="view-container">
            <Pzyd ref={ el => this._pzyd = el }/>
            <Jrjh ref={ el => this._jrjh = el } />
            <Jrxt {...this.props} ref={ el => this._jrxt = el }/>
            <p styleName="no-more">—— 没有更多了 ——</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  navIndex: state.getIn(['home', 'navIndex']),
  componentOffsetTop: state.getIn(['home', 'componentOffsetTop'])
})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  },
  changeNavTitle(index) {
    dispatch(changeNavIndex(index))
  },
  getComponentOffsetTop(data) {
    dispatch(getComponentOffsetTop(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModules(Home, styles)))
