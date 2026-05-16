import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'https://toko-online-mern-v2-production.up.railway.app'}/api/auth`;

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  authHeader,
};

export default authService;