import {request} from "../config";

async function createPreorder(data = {}){
    return request('post', `/send-banquet`, data, true)
}

export const sendPreorderApi = {
    createPreorder
}
