// 引入axios
import axios from 'axios'

// 基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 实现登录验证
export const login = (obj) => {
  return axios.post('login', obj).then(result => {
    return result.data
  })
}
