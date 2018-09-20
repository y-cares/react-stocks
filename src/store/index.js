import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import reducer from './reducer'
import saga from './saga'

// redux-saga 配置文件
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, sagaMiddleware)
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

export default store
