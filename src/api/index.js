// 引入axios
import axios from 'axios'

// 基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  var token = localStorage.getItem('mydemo_token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 实现登录验证
export const login = obj => {
  return axios.post('login', obj).then(result => {
    return result.data
  })
}

// 获取用户数据
export const getUserData = pa => {
  return axios.get('users', { params: pa }).then(result => {
    return result.data
  })
}
