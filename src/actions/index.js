import { 
  SET_TOKEN, 
  SAVE_USER_DATA 
} from './types';

export const saveUserData = (data) => {
  return{
    type: SAVE_USER_DATA,
    payload: data
  }
}

export const setToken = (token) => {
  return{
    type: SET_TOKEN,
    payload: token
  }
}