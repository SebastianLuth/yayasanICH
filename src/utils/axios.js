import axios from "axios"

axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  
  baseURL: "https://api-yayasan-ich.vercel.app",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const axiosPrivateInstance = axios.create({
  baseURL: "https://api-yayasan-ich.vercel.app",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})
