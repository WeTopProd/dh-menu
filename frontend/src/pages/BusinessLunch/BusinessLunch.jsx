import React, {useEffect, useState} from 'react';
import './BusinessLunch.scss'
import {api} from "../../api";
import Combo from "../../components/Combo/Combo";
import BusinessL from "../../assets/images/img/image 10.png"

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
            <img className="businessLunch__img" src={BusinessL} alt="BusinessLunch"/>
            <div className="businessLunch__combo">
                {types.map((elem, i) => {
                    return (
                        <Combo key={i} data={{type: "Бизнес ланч", subtype: "Комбо"}}/>
                    )
                })}
            </div>
        </div>
    );
};

export default BusinessLunch;
