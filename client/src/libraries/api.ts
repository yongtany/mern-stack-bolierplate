import axios from 'axios';

interface RegisterType {
  email: string;
  name: string;
  username: string;
  password: string;
}

interface LoginType {
  email: string;
  password: string;
}

export const register = (jsonObject: RegisterType) => axios.post('/users/signup', jsonObject);
export const login = (jsonObject: LoginType) => axios.post('/users/signin', jsonObject);
export const logout = () => axios.get('/users/logout');
export const auth = () => axios.get('/users/auth');