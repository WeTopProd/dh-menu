import React, {useEffect, useState} from 'react';
import './HookahElements.scss'
import {api} from "../../api";
import HookahElement from "./HookahElement";

const HookahElements = ({type}) => {
    const [goods, setGoods] = useState([])

    useEffect(() => {
        api.goodsApi.getList({type: "Кальянная карта", subtype: "Кальян", hookah_type: type}).then(res => {
            setGoods(res.data.results)
        })
    }, [])

    return (
        <div className="hookahElem">
            {goods.map((good, idx) => <HookahElement goods={goods} key={idx} type={type} good={good}/>)}
        </div>
    );
};

export default HookahElements;
