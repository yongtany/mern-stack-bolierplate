import axios, { AxiosResponse } from 'axios';
import { USER_SERVER } from '../../components/Config';
import { Dispatch } from 'redux';

// const LOGIN_USER = 'auth/LOGIN_USER';
// const REGISTER_USER = 'auth/REGISTER_USER';
// const AUTH_USER = 'auth/AUTH_USER';
// const LOGOUT_USER = 'auth/LOGOUT_USER';

enum ActionTypes {
  loginUser,
  registerUser,
  authUser,
  logoutUser
}

export interface AuthUserAction {
  type: ActionTypes.authUser,
  payload: AxiosResponse<any>
}

export interface LoginUserAction {
  type: ActionTypes.loginUser,
  payload: AxiosResponse<any>
}

export interface RegisterUserAction {
  type: ActionTypes.registerUser,
  payload: Promise<any>;
}

export interface LogoutUserAction {
  type: ActionTypes.logoutUser,
  payload: Promise<any>;
}

export type Action = AuthUserAction | LoginUserAction | RegisterUserAction | LogoutUserAction;

export function registerUser(dataToSubmit: any): RegisterUserAction{
  const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
      .then(response => response.data);
  
  return {
      type: ActionTypes.registerUser,
      payload: request
  }
}

export const authUser = () => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.get(`${USER_SERVER}/auth`);

    return dispatch<AuthUserAction>({
      type: ActionTypes.authUser,
      payload: request.data
    }); 

  }
}

export const loginUser = (dataToSubmit: any) => {
  return async (dispatch: Dispatch) => {
    const request = await  axios.get(`${USER_SERVER}/login`, dataToSubmit);

    return dispatch<LoginUserAction>({
      type: ActionTypes.loginUser,
      payload: request
    }); 

  }
}

export function logoutUser() : LogoutUserAction{
  const request = axios.get(`${USER_SERVER}/logout`)
  .then(response => response.data);

  return {
      type: ActionTypes.logoutUser,
      payload: request
  }
}

const initialState = {
};

// // 액션들의 타입스크립트 타입 준비
// export type AuthAction =
//   | ReturnType<typeof registerUser>
//   | ReturnType<typeof loginUser>
//   | ReturnType<typeof authUser>
//   | ReturnType<typeof logoutUser>;

export default function(state = initialState, action: Action){
  switch(action.type){
      case ActionTypes.registerUser:
          return {...state, register: action.payload }
      case ActionTypes.loginUser:
          return { ...state, loginSucces: action.payload }
      case ActionTypes.authUser:
        return {...state, userData: action.payload }
      case ActionTypes.logoutUser:
          return {...state }
      default:
          return state;
  }
}