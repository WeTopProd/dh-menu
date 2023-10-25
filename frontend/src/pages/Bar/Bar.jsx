import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './Bar.scss'
import {api} from "../../api";

const Bar = () => {
    const [types, setTypes] = useState([]);
    const pageName = "Напитки"

    useEffect(() => {
        api.goodsApi.getGoodsSubTypes({type: pageName}).then(resp => {
            setTypes(resp.data)
        })
    }, []);


    const listUrl = (name) => `/list/${pageName}/${name}`

    return (
        <div className="bar">
            <div className="bar__container">
                <div className="bar__container_items">
                    {types.map((elem, i) => {
                        return (
                            <Link key={i} to={listUrl(elem.name)}>
                                <div className="bar__container_item">
                                    <p className="bar__container_item_desc">{elem.name === "Напитки" ? "Напитки Б/А" : elem.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Bar;
