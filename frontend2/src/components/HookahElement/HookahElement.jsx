import React, {useEffect, useState} from 'react';
import './HookahElement.scss'
import BasketBtn from "../BasketBtn/BasketBtn";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api";
import {getGoods} from "../../redux/basket/thunk";
import HookahModal from "../HookahModal/HookahModal";
import BasketIcon from "../../assets/images/basket/BasketIcon.png";

const HookahElement = ({good, type}) => {
    const [tobacco, setTobacco] = useState({tobacco_type: "", additive_type: "", additive_price: ''})
    const {goods} = useSelector((state) => state.basket)
    const [isShow, setIsShow] = useState(false)
    const dispatch = useDispatch()

    const getGood = () => {
        return goods.find(g => g.goods.id === good.id)
    }

    useEffect(()=>{
        if (getGood()?.count > 0) {
            api.shoppingApi.updateBasket(good.id, {...tobacco, count: getGood()?.count}).then(res => {
                dispatch(getGoods())
            })
        }
    }, [tobacco])

    const setTobaccoType = (type) => {
        if (tobacco.tobacco_type === type) {
            setTobacco({
                ...tobacco,
                tobacco_type: "",
            })
        } else {
            setTobacco({
                ...tobacco,
                tobacco_type: type,
            })
        }
    }

    return (
        <div className="hookahElements">
            <div className="classic hookahElement">
                <div className="hookahElement__desc">
                    <p className="hookahElement__desc_name">{type}</p>
                    <p className="hookahElement__desc_price">{good.price} руб.</p>
                </div>
                <div onClick={() => setIsShow(true)} className="basketButton__basket basketButton__basket-icon">
                    <button>
                        <img src={BasketIcon} alt=""/>
                    </button>
                </div>
            </div>
            {
                isShow ? <HookahModal good={good.tobacco_type}  id={good.id} data={tobacco} setIsShow={setIsShow}/> : ''
            }
        </div>

    );
};

export default HookahElement;
