import React, { PureComponent } from 'react'
import CSSModule from 'react-css-modules'
import styles from './index.scss'

class pzydItem extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { item, index, showMoreNews } = this.props
    const ubDeal = (content) => {
      if (content.length > 50) {
        return (
          <span styleName={item.showMore ? "more" : ""} onClick={() => showMoreNews(index, item.showMore)}>
            {item.showMore ? "收起" : "展开"}<i></i>
          </span>
        )
      } else {
        return null
      }
    }
    return (
      <li styleName="pzyd-item">
        <h4>{item.showTime}</h4>
        <p styleName={item.showMore ? 'more-info' : ''}
          dangerouslySetInnerHTML={{ __html: item.content }}></p>
        {ubDeal(item.content)}
      </li>
    )
  }
}

export default CSSModule(pzydItem, styles)
