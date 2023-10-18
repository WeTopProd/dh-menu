import React, {useState} from 'react';
import './TaxiHome.scss'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import RegisterActive from "../../components/RegisterActive/RegisterActive";

const TaxiHome = () => {
    const [preorder, setPreorder] = useState(false)
    const {me} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [name, setName] = useState(!!me.first_name ? me.first_name + " " + me.last_name : '');
    const [phone, setPhone] = useState(me.phone);
    const [email, setEmail] = useState(me.email);

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    };

    const goToPreorder = () => {
        setPreorder(true)
        setTimeout(()=>{
            navigate("/")
        }, 3000)
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    return (
        <div className="taxiHome">
            {
                preorder
                    ? <div className="taxiHome__orderActive"><RegisterActive desc="ТАКСИ ЗАБРОНИРОВАНО ОЖИДАЙТЕ ЗВОНКА ДЛЯ ПОДТВЕРЖДЕНИЯ БРОНИ"/></div>
                    :
                    <>
                        <p className="taxiHome__title">Такси до дома</p>
                        <div className="taxiHome__baner">
                            <p className="taxiHome__form_subtitle">Бронирование такси</p>
                            <div className="taxiHome__baner_form">
                                <div className="taxiHome__baner_form_input">
                                    <p>Дата / Время</p>
                                    <div className="taxiHome__baner_form_inputs">
                                        <input className="taxiHome__baner_form_inputs_data" type="text" placeholder="00.00.000г"/>
                                        <input className="taxiHome__baner_form_inputs_time" type="text" placeholder="00:00"/>
                                    </div>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Имя</p>
                                    <input disabled={!!me.first_name} value={name} type="text" onChange={handleNameChange} placeholder="Имя*"/>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Телефон</p>
                                    <input disabled={!!me.phone} type="text" value={phone}  onChange={handlePhoneChange} placeholder="Телефон*"/>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Адрес</p>
                                    <input type="text" placeholder="Адрес*"/>
                                </div>
                            </div>
                            <button className="taxiHome__button" onClick={goToPreorder}>ПРЕДЗАКАЗ</button>
                        </div>
                    </>

            }
        </div>
    );
};

export default TaxiHome;
