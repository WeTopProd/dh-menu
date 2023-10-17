import React, {useEffect, useState} from 'react';
import './AdditionalServicesOrder.scss'
import {api} from "../../api";
import RegisterActive from "../RegisterActive/RegisterActive";
import BasketIcon from "../../assets/images/basket/BasketIcon.png";
import {useNavigate} from "react-router-dom";


const AdditionalServicesOrder = () => {
    const [goods, setGoods] = useState([])
    const [selected, setSelected] = useState([])
    const [ordered, setOrdered] = useState(false)
    const [comment, setComment] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        api.goodsApi.getList({type: "Доп Услуги"}).then(res => {
            setGoods(res.data.results)
        })
    }, [])

    const selectedGood = (id) => {
        return selected.find(s => id === s.id) || {}
    }

    const addToSelect = (good) => {
        if (selected.findIndex(s => s.id === good.id) === -1) {
            setSelected(s => [...s, {
                id: good.id,
                price: good.price,
                count: 1
            }])
        } else {
            setSelected(s => s.map(s2 => {
                if (s2.id === good.id) {
                    return {...s2, count: 1}
                } else {
                    return s2
                }
            }))
        }
    }

    const setCount = (good, count) => {
        if (selected.findIndex(s => s.id === good.id) !== -1) {
            setSelected(s => s.map(s2 => {
                if (s2.id === good.id) {
                    return {...s2, count: s2.count + count}
                } else {
                    return s2
                }
            }))
        }
    }

    const createOrder = () => {
        api.sendOrderApi.createSendOrder({
            description: comment,
            goods_id: selected.filter(s => s.count > 0).map(s => s.id),
            count_goods: selected.filter(s => s.count > 0).map(s => s.count),
            price_goods: selected.filter(s => s.count > 0).map(s => s.price * s.count),
            final_price: comment === selected.filter(s => s.count > 0).reduce((previousValue, currentValue) => previousValue + (currentValue.count * currentValue.price), 0)
        }).then(res => {
            setSelected([])
            setOrdered(true)
            setTimeout(()=>{
                navigate("/")
            }, 2000)
        })
    }

    return (
        <div className="addSerOrder">
            {
                ordered
                    ? <RegisterActive desc="Заказ создан"/>
                    : <div className="addSerOrder__desc">
                        <p className="addSerOrder__desc_title">Доп услуги</p>
                        <div className="addSerOrder__desc_items">
                            {
                                goods.map((good, idx) => {
                                    return <ul
                                        key={idx}
                                        className={"addSerOrder__desc_items_item"}
                                    >
                                        <li className={selectedGood(good.id).count > 0 ? "addSerOrder__desc_items_item_active" : ''}>{good.title} - {good.price} р.</li>
                                        <div className="addSerOrderButton">
                                            <div>
                                                <div className="addSerOrderButton__counter">
                                                    {
                                                        selectedGood(good.id).count > 0 ?
                                                            <div className="addSerOrderButton__counter_count">
                                                                <div className="addSerOrderButton__counter_count_button"
                                                                     onClick={() => setCount(good, -1)}>-
                                                                </div>
                                                                <p>{selectedGood(good.id).count}</p>
                                                                <div className="addSerOrderButton__counter_count_button"
                                                                     onClick={() => setCount(good, 1)}>+
                                                                </div>
                                                            </div>
                                                            : <div onClick={() => addToSelect(good)}
                                                                   className="addSerOrderButton__counter_btnIcon">
                                                                <button>
                                                                    <img src={BasketIcon} alt=""/>
                                                                </button>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                })
                            }
                        </div>
                        <textarea value={comment} onChange={e => setComment(e.target.value)}
                                  className="addSerOrder__desc_comment"
                                  placeholder="Коментарий к заказу"
                                  name="comment">
                        </textarea>
                        <button onClick={createOrder} className="addSerOrder__desc_button">Заказать</button>
                    </div>
            }
        </div>
    );
};

export default AdditionalServicesOrder;
