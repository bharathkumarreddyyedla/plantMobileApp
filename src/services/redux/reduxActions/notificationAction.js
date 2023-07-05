import { httpService } from "../../ApiService"

export const getNotification=(id,token)=>new Promise((resolve,reject)=>{
httpService.get(`notification/getAllNotifications/${id}`,token).then(res=>{
    if(res?.data){
        resolve(res?.data)
    }
}).catch(err=>{
    reject(err)
})
})