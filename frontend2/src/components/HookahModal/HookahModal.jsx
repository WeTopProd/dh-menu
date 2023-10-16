import React, {useEffect, useState} from 'react';
import './HookahModal.scss'
import BasketBtn from "../BasketBtn/BasketBtn";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api";
import {getGoods} from "../../redux/basket/thunk";

const HookahModal = ({good, id, data, setIsShow}) => {
    //const [selectedType, setSelectedType] = useState(selected)
    const  f = () => {
        setIsShow(false)
    }
   /* const closeModal = (e) => {
        setIsShow(false)
    }
    const add = () => {
        setAdditiveType(selectedType)
        setIsShow(false)
    }

    const selectType = (type) => {
        if (selectedType === type) {
            setSelectedType("")
        } else {
            setSelectedType(type)

        }
    }*/

    const [tobacco, setTobacco] = useState({tobacco_type: "", additive_type: "", additive_price: ''})
    const [additivePrice, setAdditivePrice] = useState(0)
    const {goods} = useSelector((state) => state.basket)
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
        <div className="hookahModal">
            <div className="hookahModal__desc">
                <p className="hookahModal__desc_title">Выберите табак</p>
                <div>
                    {
                        good.map((elem, idx) =>
                            <div className="hookahModal__desc_elem" key={idx} onClick={() => setTobaccoType(elem)}>
                                <p>{elem}</p>
                                <span></span>
                            </div>
                        )
                    }
                </div>
                <BasketBtn type="colored-icon" id={id} data={data}/>
                <button onClick={() => setIsShow(false)}>Закрыть</button>
            </div>
        </div>
    );
};

export default HookahModal;
