import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './AdditionalServicesList.scss'
import {api} from "../../api";

const AdditionalServicesList = () => {
    const [types, setTypes] = useState([]);
    const pageName = "Доп услуги"

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: pageName}).then(resp => {
            setTypes(resp.data)
        })
    }, []);

    return (
        <div className="additionalServicesList">
            <div className="additionalServicesList__container">
                <div className="additionalServicesList__container_items">
                    {types.map((elem, i) => {
                        return (
                            <Link key={i} to={`/${elem.name}`}>
                                <div className="additionalServicesList__container_item">
                                    <p className="additionalServicesList__container_item_desc">
                                        {elem.name}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdditionalServicesList;
