import axios from 'axios'
import {getopenId,setoppenid,removeopenId} from '@/utils/cookie.js'

 const service = axios.create({
  baseURL: 'http://www.vastall.cn',
  timeout: 5000,
  headers: {'content-type': 'application/json'}
})

 service.interceptors.request.use(config => {
    let openId = getopenId()
    if(config.method == 'post'){
        config.params = {
            // openId: openId,
openId: 'ojURPwjE0oPD7lhQAkHELDf33umc',

            // openId: 'ojURPwp5YIQyWu81pw0V9L5jQvVQ',
          ...config.data
        }
    }else if(config.method == 'get'){

          config.params = {
            // openId: openId,
openId: 'ojURPwjE0oPD7lhQAkHELDf33umc',
            // openId: 'ojURPwp5YIQyWu81pw0V9L5jQvVQ',
             ...config.params

          }


    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  })
export default service
