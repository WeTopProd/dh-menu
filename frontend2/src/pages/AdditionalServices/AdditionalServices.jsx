import React, {useEffect, useState} from 'react';
import "./AdditionalServices.scss"
import {api} from "../../api";
import AdditionalGif from "../../assets/images/additionalServices/additionalServices.gif"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AdditionalServicesOrder from "../../components/AdditionalServicesOrder/AdditionalServicesOrder";

const AdditionalServices = () => {
    const [goods, setGoods] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const {isAuth} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const onClick = () =>{
        if (isAuth){
            setIsShowModal(true)
        }else{
            navigate("/login")
        }
    }

    useEffect(()=>{
        setIsShowModal(false)
    }, [isAuth])


    useEffect(() => {
        api.goodsApi.getList({type: "Доп Услуги"}).then(res => {
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
                    Наши повара замаринуют и приготовят
                    ваше мясо на углях на вертеле к
                    праздничному событию для вас
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
                <p className="additionalServices__container_descOrder">Заказывать за 3 дня по предоплате</p>
                <button onClick={onClick}>Заказать</button>
            </div>
        </div>
            : <AdditionalServicesOrder />
    );
};

export default AdditionalServices;
