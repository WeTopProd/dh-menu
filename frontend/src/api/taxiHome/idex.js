import {request} from "../config";

async function createTaxiHome(data = {}){
    return request('post', `/send-taxi`, data, true)
}

export const sendTaxiHomeApi = {
    createTaxiHome
}
