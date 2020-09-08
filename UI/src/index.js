import axios from 'axios';
import jsCookie from 'js-cookie'
import Router from  '@/router/index'
var ui = require('element-ui')

let http = axios.create({
  baseURL: 'https://localhost:44390/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

//请求开始拦截
http.interceptors.request.use(conf => {
 
  //请求带token
     conf.headers['Authorization'] = 'Bearer '+jsCookie.get('token')
     //console.log(conf)
      return conf
  },
  error => ({ status: 0, msg: error.message })
)
// //请求返回拦截
http.interceptors.response.use(response => {
      return Promise.resolve(response)
  },
  error => {
      checkStatus(error.response)
      return Promise.reject(error)
  }
)
// http状态码错误处理
const checkStatus = (res) => {
  if(res==undefined)
  {
    ui.Message({
      message: '服务器出现未知错误，请稍后再试',
      type: 'error'
    })

    return false;
  }
  switch (res.status)
  {
      case 401 :{        //登录过期
        ui.MessageBox({
          title:'系统提示',
          message: '登录已过期，请重新登录',
          type: 'error',
          confirmButtonText: '去登陆',
          callback: action => {
            jsCookie.set('userinfo', null)
            Router.push({path: '/Login'})
          }
        })
          break;
      }
      default:
          console.log('服务器存在异常', 'middle')
          break;
  }
}

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}