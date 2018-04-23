import { USERNAME_CHANGED, PASSWORD_CHANGED } from './types';

export const usernameChanged = (text) => {
  return{
    type: USERNAME_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
    return{
      type: PASSWORD_CHANGED,
      payload: text
    }
  }