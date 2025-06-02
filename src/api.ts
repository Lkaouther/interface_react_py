// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL of your backend

export const getData = async () => {
  const response = await axios.get(`${API_URL}/data`);
  return response.data;
};

export const verifyLogin = async (data: { name: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data.is_valid;
};

