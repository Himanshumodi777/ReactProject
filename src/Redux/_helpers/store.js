import { createStore, combineReducers } from 'redux';
import homeSuccess from '../_reducers/home.reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({ homeSuccess })
const persistConfig = {
  key: 'root',
  storage: storage,

};
const pReducer = persistReducer(persistConfig, rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(pReducer, undefined)
export const persistor = persistStore(store, {})
export default store;
