import React, {useEffect, useState} from 'react';
import "./AdditionalServices.scss"
import {api} from "../../api";
import AdditionalGif from "../../assets/images/additionalServices/additionalserv.png"
import {useSelector} from "react-redux";
import AdditionalServicesOrder from "../../components/AdditionalServicesOrder/AdditionalServicesOrder";

const AdditionalServices = () => {
    const [goods, setGoods] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const {isAuth} = useSelector((state) => state.auth)

    useEffect(()=>{
        setIsShowModal(false)
    }, [isAuth])


    useEffect(() => {
        api.goodsApi.getList({type: "Доп услуги"}).then(res => {
            setGoods(res.data.results)
        })
    }, [])
    return (
        !isShowModal ?
        <div className="additionalServices">
            <div className="additionalServices__container">
                <h3 className="additionalServices__container_title">Доп Услуги</h3>
                <img src={AdditionalGif} alt="AdditionalGif"/>
                <p className="additionalServices__container_desc">
                    Наша услуга представляет собой идеальное решение для занятых людей,
                    ценящих вкус и качество в каждом приеме пищи, но не имеющих достаточно времени на приготовление.
                    Мы замаринуем и приготовим ваше мясо на мангале на вертеле с нежностью и вниманием к каждой детали.
                </p>
                <p className="additionalServices__container_desc">
                    Наши повара - настоящие мастера своего дела!
                </p>
                <div className="additionalServices__container_items">
                    <ul className={"additionalServices__container_items_elem"}>
                        {
                            goods.map((good, idx) => {
                                return <li  key={idx}>{good.title} - {good.price} руб</li>
                            })
                        }
                    </ul>
                </div>
                <p className="additionalServices__container_descOrder">Заказывать за 3 дня</p>
                <button onClick={() =>  setIsShowModal(true)}>Оформить заказ</button>
            </div>
        </div>
            : <AdditionalServicesOrder />
    );
};

export default AdditionalServices;
