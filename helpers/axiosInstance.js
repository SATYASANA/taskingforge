import axios from "axios"

// const BASE_URL = 'https://taskforge-production-2ddb.up.railway.app/api/v1'
const BASE_URL = 'http://localhost:10000/api/v1'

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true

export default axiosInstance