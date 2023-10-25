import React, {useEffect, useState} from 'react';
import "./Card.scss"
import {getImage} from "../../helpers/image";
import {api} from "../../api";
import BasketBtn from "../BasketBtn/BasketBtn";

const Card = ({data, active}) => {
    const [goods, setGoods] = useState([])
    const [time, setTime] = useState(false)
    const [showId, setShowId] = useState(-1)

    useEffect(() => {
        api.goodsApi.getList(data).then(res => {
            setGoods(res.data.results)
        })
    }, [])


    const handleClick = (id) => {
        if (showId === id) {
            setShowId(-1)
            setTime(false)
        } else {
            setShowId(id)
            setTimeout(() => {
                setTime(true)
            }, 1500);
        }
    }

    const isShow = (idx) => showId === idx

    return (
        <div className="card__container_items">
            {goods.map((good, idx) => <div
                key={idx}
                className={isShow(idx) || active ? "card  card__active" : "card"}
                >
                <img
                    onClick={() => handleClick(idx)}
                    className={isShow(idx) || active ? "card__img  card__active_img" : "card__img"}
                    src={getImage(good.images)}
                    alt="icon"
                />
                    {
                        isShow(idx) && time || active  ?
                            <div className="card__desc_active">
                                <div className="card__desc_active_title">
                                    <p className="card__desc_name">{good.title}</p>
                                </div>
                                <p className="card__desc_active_compound">Состав {good.compound}</p>
                                <p className="card__desc_active_weight">{good.weight} г.</p>
                                <div className="card__desc_price">
                                    <p className="card__desc_price_text">{good.price} руб</p>
                                    <BasketBtn type="iconText" id={good.id}/>
                                </div>
                            </div>
                            : <div className="card__desc">
                                <p className="card__desc_name">{good.title}</p>
                                <div className="card__desc_price">
                                    <p className="card__desc_price_text">{good.price} руб</p>
                                    <BasketBtn type="iconText" id={good.id}/>
                                </div>
                            </div>
                    }
                </div>
            )}
        </div>

    );
};

export default Card;
