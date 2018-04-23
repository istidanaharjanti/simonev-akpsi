import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    SET_TOKEN
  } from '../actions/types';
  
  const INITIAL_STATE = {
    username: '',
    password: '',
    currentToken: ''
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case USERNAME_CHANGED:
        return {... state, username: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload }
      case SET_TOKEN:
        return { ...state, currentToken: action.payload }
      default:
        return state;
    }
  }
  