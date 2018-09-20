import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModule from 'react-css-modules'
import styles from '../index.scss'
import {
  changeNavIndex
} from '../store/actionCreator'

class Nav extends PureComponent {
  render() {
    const { navIndex, navTitle, changeNavTitle } = this.props
    const newNavTitle = navTitle.toJS()
    return (
      <div styleName="nav-container">
        <ul>
          {
            newNavTitle.map((item, index) => {
              return <li
                key={index}
                styleName={navIndex == index ? 'nav-active' : ''}
                onClick={() => changeNavTitle(index)}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    navIndex: state.getIn(['home', 'navIndex']),
    navTitle: state.getIn(['home', 'navTitle'])
})

const mapDispatchToProps = dispatch => ({
  changeNavTitle(index) {
    dispatch(changeNavIndex(index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModule(Nav, styles))
