import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import other reducers if you have more
import countReducer from './countReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  authx: authReducer,
  count: countReducer,
  signup: signupReducer
  // Add more reducers here if needed
});

export default rootReducer;
