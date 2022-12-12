import request from "utils/request.js"

export function getDesData(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}

export function getCity(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}



