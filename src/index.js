import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/index.css'
// import './static/iconfont/iconfont.css'
import App from './router'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
