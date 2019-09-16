import { createStore, applyMiddleware } from 'redux';

import { logger } from './middleware';
import appReducer from './reducers';

const store = createStore(
    appReducer,
    applyMiddleware(logger)
)

export default store