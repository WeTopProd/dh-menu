import React, {useEffect, useState} from 'react';
import './BusinessLunch.scss'
import {api} from "../../api";
import Combo from "../../components/Combo/Combo";

const BusinessLunch = () => {
    const [types, setTypes] = useState([]);
    const pageName = "Бизнес ланч"

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: pageName}).then(resp => {
            setTypes(resp.data)
        })
    }, []);


    return (
        <div className="businessLunch">
            <div className="businessLunch__desc">
                <p className="businessLunch__desc_title">Бизнес ланч</p>
                <p className="businessLunch__desc_subtitle">Ежедневно</p>
                <p className="businessLunch__desc_time">с 12:00 - 16:00</p>
            </div>
            {types.map((elem, i) => {
                return (
                    <Combo key={i} data={{type: "Бизнес ланч", subtype: "Комбо"}}/>
                )
            })}
        </div>
    );
};

export default BusinessLunch;
