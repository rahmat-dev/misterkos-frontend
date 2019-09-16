import { combineReducers } from 'redux';

import kost from './kost';
import user from './user';

const appReducer = combineReducers({
  kost,
  user
})

export default appReducer