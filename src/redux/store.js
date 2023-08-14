import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api } from '../datamodel/rtkQuerySlice'
// import rootReducer from './reducers'
import authReducer from './reducers/authReducer'; // Import other reducers if you have more
import countReducer from './reducers/countReducer';

const store = configureStore({
  reducer: {
    // rootReducer,
    authx: authReducer,
    count: countReducer,
    [api.reducerPath]: api.reducer,
    // Other reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)

export default store;
