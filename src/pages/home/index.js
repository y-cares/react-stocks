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

class Home extends PureComponent {
  componentDidMount() {
    this.props.changeHeaderTitle('超级选股', this.props)
  }
  render() {
    return (
      <Fragment>
        <Nav />
        <div id="views" styleName="home">
          <div styleName="view-container" ref={(container)=>{this.container = container}}>
            <Pzyd />
            <Jrjh />
            <Jrxt {...this.props}/>
            <p styleName="no-more">—— 没有更多了 ——</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  changeHeaderTitle(title, props) {
    dispatch(changeHeaderTitleAction(title, props))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CSSModules(Home, styles)))
