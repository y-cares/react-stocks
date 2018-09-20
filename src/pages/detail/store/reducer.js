import { fromJS } from 'immutable'
import {
  GET_JRJH_STOCK_MSG,
  GET_JRJH_STOCK_DATA,
  GET_JRJH_STOCK_ITEM,
  GET_JRJH_STOCK_PLATE,
  GET_JRJH_PLATE_SORT
} from './constants'

const defaultState = fromJS({
  stockMsg: [],
  stockData: [],
  stockItem: {},
  stockPlate: [],
  plateSort: true
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_JRJH_STOCK_MSG:
      return state.set('stockMsg', action.data)
    case GET_JRJH_STOCK_DATA:
      return state.set('stockData', action.data)
    case GET_JRJH_STOCK_ITEM:
      return state.set('stockItem', action.data)
    case GET_JRJH_STOCK_PLATE:
      return state.set('stockPlate', action.data)
    case GET_JRJH_PLATE_SORT:
      return state.merge({
        plateSort: !state.get('plateSort'),
        stockPlate: action.data
      })
    default:
      return state
  }
}
