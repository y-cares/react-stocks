import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModule from 'react-css-modules'
import styles from './index.scss'

class Header extends PureComponent{
  constructor(props) {
    super(props)
  }
  goBack = () => {
    const props = this.props.props.toJS()
    props.history.goBack()
    console.log('go back...')
  }
  render() {
    const { title } = this.props
    return (
      <div id="back" styleName="stock-back">
        <i onClick={this.goBack}></i>{title}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  title: state.getIn(['header', 'title']),
  props: state.getIn(['header', 'props'])
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(CSSModule(Header, styles))

