import {goodsApi} from "./goods";
import {authApi} from "./auth";
import {shoppingApi} from "./shopping";
import {basketApi} from "./basket";
import {orderApi} from "./order";
import {sendOrderApi} from "./sendOrder";
import {sendPreorder, sendPreorderApi} from "./preorder";
import {sendTaxiHomeApi} from "./taxiHome/idex";

export const api = {
    authApi,
    goodsApi,
    shoppingApi,
    basketApi,
    orderApi,
    sendOrderApi,
    sendPreorderApi,
    sendTaxiHomeApi
}
