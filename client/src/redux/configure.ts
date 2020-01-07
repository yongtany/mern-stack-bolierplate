import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import * as modules from './modules';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const reducers = combineReducers(modules);
const middlewares = [promiseMiddleware, ReduxThunk];

// 개발 모드일 때만 Redux Devtools 적용
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;


// preloadedState는 추후 서버사이드 렌더링이 되었을 때 전달 받는 초기 상태입니다.
const configure = () => createStore(reducers, composeEnhancers(
  applyMiddleware(...middlewares)
));

export default configure;