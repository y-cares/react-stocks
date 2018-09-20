import axios from 'axios'
import { fromJS } from 'immutable'
import {  
  NAV_INDEX,
  GET_PZYD_DATA,
  SHOW_MORE_NEWS,
  GET_JRJH_DATA,
  GET_STATE_DATA,
  GET_STATE_ITEM
} from './constants'

const getPzydAction = data => ({
  type: GET_PZYD_DATA,
  data: fromJS(data)
})

const getJrijhAction = (data, news) => ({
  type: GET_JRJH_DATA,
  data: fromJS(data),
  news
})

export const getStateAction = (onData, offData) => ({
  type: GET_STATE_DATA,
  onData: fromJS(onData),
  offData: fromJS(offData),
})

export const changeNavIndex = index => ({
  type: NAV_INDEX,
  index
})


export const showMoreNewsAction = (index, flag) => ({
  type: SHOW_MORE_NEWS,
  index,
  flag
})

// 获取盘中异动数据
export const getPzydList = () => {
  return async dispatch => {
    const res = await axios.get('/api/pzydData.json')
    const result = []
    res.data.resultList.forEach(item => {
      result.push({
        id: item.id,
        showTime: item.createdAt.substr(11, 5),
        content: `${item.title}<br />${item.summary}`,
        showMore: false
      })
    })
    dispatch(getPzydAction(result))
  }
}

// 获取今日形态数据
export const getStateList = () => {
  return async dispatch => {
    const res = await axios.get('/api/stateData.json')
    const onResult = res.data.resultList.filter(item => item.isConcern === '1')
    const offResult = res.data.resultList.filter(item => item.isConcern === '0')
    dispatch(getStateAction(onResult, offResult))
  }
}

// 获取今日机会数据
export const getJrjhList = () => {
  return async dispatch => {
    const res = await axios.get('/api/jrjhData.json')
    const news = res.data.generalCommentInfo.commentContent
    const result = []
    res.data.resultList.forEach(item => {
      result.push({
        title: item.title,
        subjId: item.subjId,
        news: item.featuredMsgTitle,
        time: item.featuredMsgAt.substr(5, 11).replace('T', ' '),
        stockList: item.stockInfoList
      })
    })
    dispatch(getJrijhAction(result, news))
  }
}

export const getStateItemAction = data => ({
  type: GET_STATE_ITEM,
  data: fromJS(data)
})

