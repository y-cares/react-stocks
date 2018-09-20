import { fromJS } from 'immutable'
import axios from 'axios'
import {
  GET_JRJH_STOCK_MSG,
  GET_JRJH_STOCK_DATA,
  GET_JRJH_STOCK_ITEM,
  GET_JRJH_STOCK_PLATE,
  GET_JRJH_PLATE_SORT
} from './constants'

const getJrjhStockMsgAction = data => ({
  type: GET_JRJH_STOCK_MSG,
  data: fromJS(data)
})

const getHJrjhStockDataAction = data => ({
  type: GET_JRJH_STOCK_DATA,
  data: fromJS(data)
})

export const getJrjhStockMsg = (subId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/jrjhStockMsg.json?subId=${subId}`)
      const result = res.data.resultList.find(item => item.subjId === subId)
      const articleItem = result.articleList.find(item => item.id === result.featuredMsgId)
      result.articleList = [...new Set([articleItem, ...result.articleList])]
      dispatch(getJrjhStockMsgAction(result))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getJrjhStockData = (subId, index) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/jrjhStockData.json?subId=${subId}`)
      const result = res.data.resultList[index].resultList
      dispatch(getHJrjhStockDataAction(result))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getJrjhStockItem = data => ({
  type: GET_JRJH_STOCK_ITEM,
  data: fromJS(data)
})

export const getJrjhStockPlate = data => ({
  type: GET_JRJH_STOCK_PLATE,
  data: fromJS(data)
})

export const getJrjhPlateSort = data => ({
  type: GET_JRJH_PLATE_SORT,
  data: fromJS(data)
})