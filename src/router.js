import React, { Component, Fragment } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'   // 路由
import { Provider } from 'react-redux'   // 统一方法管理 state 数据
import Loadable from 'react-loadable'  // 用于路由的按需加载
import store from './store'    // store 数据
import Header from './components/header'
import Load from './components/load'

// 首页
const HomeComponent = Loadable({
  loader: () => import('./pages/home'),
  loading: Load
})

// 主题选股
const DetailComponent = Loadable({
  loader: () => import('./pages/detail'),
  loading: Load
})

// 盘中异动
const MoveComponent = Loadable({
  loader: () => import('./pages/move'),
  loading: Load
})

// 形态选股
const StateComponent = Loadable({
  loader: () => import('./pages/state'),
  loading: Load
})

// 形态选股详情页
const StateDetailComponent = Loadable({
  loader: () => import('./pages/stateDetail'),
  loading: Load
})

// 主题选股详情页
const newsComponent = Loadable({
  loader: () => import('./pages/news'),
  loading: Load
})

// 板块个股页
const plateComponent = Loadable({
  loader: () => import('./pages/plate'),
  loading: Load
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/detail/:id/:index" exact component={DetailComponent}></Route>
              <Route path="/move" exact component={MoveComponent}></Route>
              <Route path="/state/:nav" exact component={StateComponent}></Route>
              <Route path="/stateDetail" exact component={StateDetailComponent}></Route>
              <Route path="/news" exact component={newsComponent}></Route>
              <Route path="/plate" exact component={plateComponent}></Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
