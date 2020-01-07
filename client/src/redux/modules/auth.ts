import {
  createAction,
  ActionType,
} from 'typesafe-actions';

import * as api from '../../libraries/api';

const LOGIN_USER = 'auth/LOGIN_USER';
const REGISTER_USER = 'auth/REGISTER_USER';
const AUTH_USER = 'auth/AUTH_USER';
const LOGOUT_USER = 'auth/LOGOUT_USER';

export const loginUser = createAction(LOGIN_USER, api.login)();
export const registerUser = createAction(REGISTER_USER, api.register)();
export const logoutUser = createAction(LOGOUT_USER, api.logout)();
export const authUser = createAction(AUTH_USER, api.auth)();


const actions = { registerUser, loginUser, logoutUser, authUser };
type AuthActions = ActionType<typeof actions>;


const initialState = {};

export default function(state=initialState, action: AuthActions){
  switch(action.type){
      case REGISTER_USER:
          return {...state, register: action.payload }
      case LOGIN_USER:
          return { ...state, loginSucces: action.payload }
      case AUTH_USER:
        return {...state, userData: action.payload }
      case LOGOUT_USER:
          return {...state }
      default:
          return state;
  }
}