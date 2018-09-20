import { fromJS } from 'immutable'
import {
  NAV_INDEX,
  GET_PZYD_DATA,
  SHOW_MORE_NEWS,
  GET_JRJH_DATA,
  GET_STATE_DATA,
  GET_STATE_ITEM
} from './constants'


const defaultState = fromJS({
  navIndex: 0,
  navTitle: ['盘中异动', '今日机会', '今日形态'],
  pzydData: [],
  jrjhNews: '',
  jrjhData: [],
  stateOnData: [],
  stateOffData: [],
  stateItem: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case NAV_INDEX:
      return state.set('navIndex', action.index)
    case GET_PZYD_DATA:
      return state.set('pzydData', action.data)
    case SHOW_MORE_NEWS:
      const newState = state.get('pzydData').toJS()
      newState[action.index].showMore = !action.flag
      return state.set('pzydData', fromJS(newState))
    case GET_JRJH_DATA:
      return state.merge({
        jrjhData: action.data,
        jrjhNews: action.news
      })
    case GET_STATE_DATA:
      return state.merge({
        stateOnData: action.onData,
        stateOffData: action.offData
      })
    case GET_STATE_ITEM:
      return state.set('stateItem', action.data)
    default: 
      return state
  }
}


