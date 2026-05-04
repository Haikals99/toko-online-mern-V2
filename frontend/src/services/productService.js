import axiosInstance from '../utils/axiosConfig';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/produk`;

export const getProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};