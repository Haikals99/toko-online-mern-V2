import axiosInstance from '../utils/axiosConfig';

const API_URL = `${process.env.REACT_APP_API_URL || 'https://toko-online-mern-v2-production.up.railway.app'}/api/produk`;

export const getProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};