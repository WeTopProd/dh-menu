import React, {useEffect, useState} from 'react';
import "./Combo.scss"
import {api} from "../../api";
import BasketBtn from "../BasketBtn/BasketBtn";

const Combo = ({data}) => {
    const [goods, setGoods] = useState([])

    console.log(goods.map((good, idx) => good))
    useEffect(() => {
        api.goodsApi.getList(data).then(res => {
            setGoods(res.data.results)
        })
    }, [])


    return (
        <>
            {goods.map((good, idx) =>
                <div key={idx} className="combo">
                    <div className="combo__img">
                        {good.images.map((elem, idx) =>  <img key={idx} src={elem.images} alt="icon"/>)}
                    </div>
                    <div className="combo__desc">
                        <p className="combo__desc_title">{good.title}</p>
                        <div className="combo__desc_nameItems">
                            <p className="combo__desc_nameItems_item">{good.description}</p>
                        </div>
                        <p className="combo__desc_weight">{good.weight} г.</p>
                        <div className="combo__desc_price">
                            <p className="combo__desc_price_text">{good.price} руб</p>
                            <BasketBtn type="icon" id={good.id} style={"basketBtnCombo"}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Combo;
