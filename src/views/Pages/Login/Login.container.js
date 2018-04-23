import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import LoginComponent from './Login';
import reducers from '../../../reducers';

export const LoginContainer = props => {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
        <LoginComponent {...props} />
      </Provider>
    );
}

export default LoginContainer;
