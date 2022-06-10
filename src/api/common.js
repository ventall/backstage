import axios from "axios"
import store from "store"
import { Message } from 'element-ui';

//axios默认值
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
})

//request 拦截器
instance.interceptors.request.use(async config => {
  let token = store.get(process.env.VUE_APP_TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

//response 拦截器
instance.interceptors.response.use(response => {
  //剥离最外层
  return response?.data
}, err => {
  Message({
    type: "error",
    message: err.message
  })
  return Promise.reject(err)
})
export default instance