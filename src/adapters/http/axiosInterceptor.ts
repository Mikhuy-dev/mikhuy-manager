
import axiosClient from "./axiosClient";
import { addToken } from "./interceptor/addToken";
import { newToken } from "./interceptor/newToken";


export function AxiosInterceptor(){
    
    axiosClient.interceptors.request.use((req)=>{
            return addToken(req)
    }, error => {
      return Promise.reject(error)
    })
    
    axiosClient.interceptors.response.use(
      (res) => {
          return res
      },
      async (error) => newToken(error)
  )
  
}