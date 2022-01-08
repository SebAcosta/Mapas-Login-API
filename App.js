import React from 'react';
import {MyDrawer} from "./navigation/MainNavigator";
import authReducer from "./Store/Reducers/authReducers";
import LoginValidation from './navigation/LoginValidation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(
  rootReducer, 
  applyMiddleware(ReduxThunk)
);

export default function App() {
  return (
    <Provider store={store}>
      <LoginValidation/>
    </Provider>
  );
}
