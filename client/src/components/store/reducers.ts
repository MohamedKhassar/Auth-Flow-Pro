import { combineReducers } from 'redux';
import counterSlice from './slices/counterSlice';
import AuthSlice from './slices/AuthSlice';
// Import other reducers if necessary

const rootReducer = combineReducers({
    counter: counterSlice,
    auth: AuthSlice
    // Add other reducers here
});

export default rootReducer;
