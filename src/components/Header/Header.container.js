import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import HeaderComponent from './Header';
import reducers from '../../reducers';

export const HeaderContainer = props => {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
        <HeaderComponent {...props} />
      </Provider>
    );
}

export default HeaderContainer;
