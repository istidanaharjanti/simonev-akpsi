import {
    SET_TOKEN, 
    SAVE_USER_DATA
  } from '../actions/types';
  
  const INITIAL_STATE = {
    currentToken: '',
    userData: {}
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case SET_TOKEN:
        return { ...state, currentToken: action.payload }
      case SAVE_USER_DATA:
        return { ...state, userData: action.payload }
      default:
        return state;
    }
  }
  