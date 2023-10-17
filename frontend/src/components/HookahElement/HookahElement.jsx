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
                </div>
                {
                    good.tobacco_type.map((tobacco_type, idc) =>
                        <p key={idc}
                           onClick={() => setTobaccoType(tobacco_type)}
                           className={"hookahElement__tobaccoType" + ((getGood()?.tobacco_type ? getGood()?.tobacco_type === tobacco_type : tobacco.tobacco_type === tobacco_type) ? " hookahElement__tobaccoType_active" : '')}
                        >
                            {tobacco_type}
                        </p>
                    )
                }
                <p className="hookahElement__desc_price">{good.price} руб.</p>
                <BasketBtn type="colored-icon" id={good.id} data={tobacco}/>
            </div>
        </div>

    );
};

export default HookahElement;
