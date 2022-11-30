import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import qs from qs

const service = axios.create({
    baseURL: 'https://zwfw.credit.gdgov.cn/yxjc/geo-api/', // url = base url + request url
    // timeout: 10000 // request timeout
})

service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
      if (response.status === 200) {            
        return Promise.resolve(response);        
      } else {            
        return Promise.reject(response);        
      } 
    },
    error => {
      console.log('err' + error) 
      Message({
        message: error.message,
        type: 'error',
        duration: 10 * 1000
      })
      return Promise.reject(error)
    }
  )

  export default service