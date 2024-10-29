import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://joy-backend-8sqdhzpxy-ksubi666s-projects.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
