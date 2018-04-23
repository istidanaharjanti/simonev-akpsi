import {
    SET_TOKEN
  } from '../actions/types';
  
  const INITIAL_STATE = {
    currentToken: ''
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case SET_TOKEN:
        return { ...state, currentToken: action.payload }
      default:
        return state;
    }
  }
  