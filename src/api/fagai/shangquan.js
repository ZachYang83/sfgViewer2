import request from "utils/request.js"

export function getHuji(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}

export function getSqById(url,params){
    return request({
        url,
        method:'get',
        params,
    })
}




