技术栈：
react + react-router-dom + react-loadable + react-redux + redux + redux-thunk + react-immutable + immutable + sass + react-css-modules + vw

react: react 语法。

react-router-dom：路由。

react-loadable：路由的按需加载。

Redux：状态管理器。

react-redux：统一管理 redux 方法插件。

redux-thunk：redux 中间件，用于实现在 action 中的异步操作（redux-saga 中间件也可实现这一功能）。

immutable：用于将 state 转化成不可修改的数据类型。（redux 中的 state 是不可直接进行修改的，使用 immutable 转化其数据类型，可有效避免wu操作）。

react-immutable：用于创建combineReducers与Immutable.js状态一起使用的Redux的等效函数。

sass: 预处理语言

react-css-modules：实现CSS模块的自动映射。为每个CSS类分配一个具有全局唯一名称的本地范围标识符。CSS模块支持模块化和可重用的CSS！

vw：vw布局


目前欠缺部分：flow 静态类型检查（后续有空完善）