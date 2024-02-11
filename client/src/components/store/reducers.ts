import { combineReducers } from 'redux';
import AuthSlice from './slices/AuthSlice';
// Import other reducers if necessary

const rootReducer = combineReducers({
    auth: AuthSlice
    // Add other reducers here
});

export default rootReducer;
