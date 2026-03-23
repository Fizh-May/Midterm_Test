import axios from 'axios';

const API_BASE = '/products';

export const getProducts = (params = {}) => axios.get(API_BASE, { params });
export const getProductById = (id) => axios.get(`${API_BASE}/${id}`);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);
