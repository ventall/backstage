import instance from "@/api/common"
import store from "store"
import API_LIST from '@/api/api.config'
import encrypt from "@/util/encrypt"
import { Message } from "element-ui"
export default async function Http ({ type, data, parmas }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, rsaKey = "", setToken = false } = API_LIST[type]
  try {
    if (rsaKey && data[rsaKey]) {
      console.log(data[rsaKey]);
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { parmas: data } : data
    let result = await instance[method](url, data, { parmas })
    if (setToken) {
      let token = result.token
      store.set(process.env.VUE_APP_TOKEN_NAME, token)
    }
    Message({
      message: result?.message,
      type: 'success'
    })
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      Message.error(message)
    }
  }
}