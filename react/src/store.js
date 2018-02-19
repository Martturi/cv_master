import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import CVreducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(CVreducer, composeEnhancers(applyMiddleware(...[ReduxThunk])))

export default store
