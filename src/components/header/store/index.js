import { fromJS } from 'immutable'

const CHANGE_HEADER_TITLE = 'header/change-header-title'

const defaultState = fromJS({
  title: '超级选股',
  props: {}
})


export const changeHeaderTitleAction = (title, props) => ({
  type: CHANGE_HEADER_TITLE,
  title,
  props: fromJS(props)
})


export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TITLE:
      return state.merge({
          title: action.title,
          props: action.props
        })
    default:
      return state
  }
}
