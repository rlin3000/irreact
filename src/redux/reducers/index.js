import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import other reducers if you have more
import countReducer from './countReducer';

const rootReducer = combineReducers({
  authx: authReducer,
  count: countReducer
  // Add more reducers here if needed
});

export default rootReducer;
