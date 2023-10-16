import {request} from "../config";

async function createSendOrder(data = {}){
    return request('post', `/send-order`, data, true)
}

export const sendOrderApi = {
    createSendOrder
}
