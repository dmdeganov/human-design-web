import axiosDefault from 'axios';
export const BASE_API_URL = 'http://5.45.79.85';
export const axios = axiosDefault.create({
  baseURL: BASE_API_URL,
});
