import React, {useEffect, useState} from 'react';
import './TaxiHome.scss'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import ImgTaxi from "../../assets/images/img/image 3.png"
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {api} from "../../api";

const TaxiHome = () => {
    const [preorder, setPreorder] = useState(false)
    const {me} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [name, setName] = useState(!!me.first_name ? me.first_name + " " + me.last_name : '');
    const [phone, setPhone] = useState(me.phone);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const createOrder = () => {
        if (!date) {
            alert('Дата: Вы не указали дату')
            return
        }
        if (!time) {
            alert('Время : Вы не указали время')
            return
        }
        if (!name) {
            alert('Имя: Вы не указали имя')
            return
        }
        if (!phone) {
            alert('Телефон: Вы не указали номер телефона')
            return
        }
        if (!address) {
            alert('Адрес: Вы не указали адрес')
            return
        }
    }

    let arrPreorder = [
        date,
        time,
        name,
        phone,
        address,
    ]
    let arrLenght = arrPreorder.map(e => e.length)
    let arrBoolean =  arrLenght.includes(0);

    let timeWatch = time.slice(1, 3)
    const arrWatch = ["04", "05", "06", "07", "08", "09", "10"]

    useEffect(() => {
        if (arrWatch.includes(timeWatch.toString())) {
            alert('Некоректное время: Заведение работает с 11:00 до 3:00')
            return
        }
    }, [timeWatch])


    const createPreorder = () => {
        arrWatch.includes(timeWatch.toString()) ?  alert('Некоректное время: Заведение работает с 11:00 до 3:00')
        : arrBoolean ? createOrder()
        : api.sendPreorderApi.createPreorder({
            date: date,
            time: time,
            first_name: name,
            phone: phone,
            address: address,
        }).then(res => {
            setPreorder(true)
            setTimeout(()=>{
                navigate("/")
            }, 2000)
        })
    }

    return (
        <div className="taxiHome">
            {
                preorder
                    ? <RegisterActive desc="ТАКСИ ЗАБРОНИРОВАНО ОЖИДАЙТЕ ЗВОНКА ДЛЯ ПОДТВЕРЖДЕНИЯ БРОНИ"/>
                    : <>
                        <div className="taxiHome__baner">
                            <img className="taxiHome__baner_img" src={ImgTaxi} alt="ImgTaxi"/>
                            <p className="taxiHome__baner_title">Бронирование такси</p>
                            <div className="taxiHome__baner_form">
                                <div className="taxiHome__baner_form_input">
                                    <p>Дата / Время</p>
                                    <div className="taxiHome__baner_form_inputs">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={["TimePicker"]}>
                                                <DatePicker
                                                    // !Убрать border у data and time
                                                    slotProps={{ textField: { variant: "standard" } }}
                                                    sx={{
                                                        // fontSize
                                                        width: "100%",
                                                    }}
                                                    label={date ? "" : "Дата*"}
                                                    onChange={e => setDate(`${e["$d"]}`.slice(4, 15))}
                                                    /*variant="standard"*/
                                                />
                                                <TimePicker
                                                    // !Убрать border у data and time
                                                    slotProps={{ textField: { variant: "standard" } }}
                                                    sx={{
                                                        width: "100%",
                                                    }}
                                                    label={time ? "" : "Время*"}
                                                    ampm={false}
                                                    onChange={e => setTime(`${e["$d"]}`.slice(15, 34))}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Имя</p>
                                    <input  value={name} type="text" onChange={handleNameChange} placeholder="Имя*"/>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Телефон</p>
                                    <input  type="text" value={phone}  onChange={handlePhoneChange} placeholder="Телефон*"/>
                                </div>
                                <div className="taxiHome__baner_form_input">
                                    <p>Адрес</p>
                                    <input
                                        placeholder="Адрес*"
                                        id="address"
                                        type="text"
                                        name="address"
                                        required
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <p className="taxiHome__baner_desc">Проблема добраться домой в позднее время? Такси Дали-Хинкали поможет решить вашу проблему!</p>
                            <button className="taxiHome__button" onClick={createPreorder}>ПРЕДЗАКАЗ</button>
                        </div>
                    </>

            }
        </div>
    );
};

export default TaxiHome;
