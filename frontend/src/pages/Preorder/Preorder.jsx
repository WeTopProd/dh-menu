import React, {useEffect, useState} from 'react';
import './Preorder.scss'
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {api} from "../../api";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const Preorder = () => {
    const [preorder, setPreorder] = useState(false)
    const {me} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [name, setName] = useState(!!me.first_name ? me.first_name + " " + me.last_name : '');
    const [phone, setPhone] = useState(me.phone);
    const [email, setEmail] = useState(me.email);
    const [eventDesc, setEventDesc] = useState('');
    const [roomSelection, setRoomSelection] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeBefore, setTimeBefore] = useState('');
    const [countPeople, setCountPeople] = useState('');
    const [comment, setComment] = useState('');

    let arrPreorder = [
        name,
        phone,
        email,
        eventDesc,
        roomSelection,
        date,
        timeFrom,
        timeBefore,
        countPeople,
        roomSelection === 'Зал' && countPeople >= 27 ? '' : 27,
        roomSelection === 'Веранда' && countPeople >= 51 ? '' : 51,
        roomSelection === 'Зал и веранда' && countPeople >= 77 ? '' : 77
    ]
    let arrLenght = arrPreorder.map(e => e.length)
    let arrBoolean =  arrLenght.includes(0);

    const createOrder = () => {
        if (!name) {
            alert('name:')
            return
        }
        if (!phone) {
            alert('phone:')
            return
        }
        if (!email) {
            alert('email:')
            return
        }
        if (!eventDesc) {
            alert('eventDesc:')
            return
        }
        if (!roomSelection) {
            alert('roomSelection:')
            return
        }
        if (!date) {
            alert('date:')
            return
        }
        if (!timeFrom) {
            alert('timeFrom:')
            return
        }
        if (!timeBefore) {
            alert('timeBefore:')
            return
        }
        if (!countPeople) {
            alert('countPeople:')
            return
        }
        if (roomSelection === 'Зал' && countPeople >= 27) {
            alert('Зал:')
            return
        }
        if (roomSelection === 'Веранда' && countPeople >= 51) {
            alert('Веранда:')
            return
        }
        if (roomSelection === 'Зал и веранда' && countPeople >= 77) {
            alert('Зал и веранда:')
            return
        }
        if (!comment) {
            alert('comment:')
            return
        }
    }

    const createPreorder = () => {
        arrBoolean ?  createOrder()
        : api.sendPreorderApi.createPreorder({
            date: date + ` time: с ${timeFrom} до ${timeBefore}`,
            first_name: name,
            phone: phone,
            email_user: email,
            event: eventDesc,
            hall: roomSelection,
            count_people:countPeople,
            additional_services: comment
        }).then(res => {
            console.log(res, 'resssssssss')
            /*setPreorder(true)
            setTimeout(()=>{
                navigate("/")
            }, 2000)*/
        })
    }

    return (
        <div className="preorder">
            {
                preorder
                ? <RegisterActive desc="Заказ оформлен"/>
                    :  <div className="preorder__container">
                        <p>Предзаказ банкета</p>
                        <div>
                            <input disabled={!!me.first_name} value={name} type="text" onChange={e => setName(e.target.value)} placeholder="Имя*"/>
                        </div>
                        <div>
                            <input disabled={!!me.phone} type="text" value={me.phone}  onChange={e => setPhone(e.target.value)} placeholder="Телефон*"/>
                        </div>
                        <div>
                            <input disabled={!!me.email} type="text" value={me.email} onChange={e => setEmail(e.target.value)} placeholder="Почта*"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setEventDesc(e.target.value)} placeholder="Событие*"/>
                        </div>
                        <div>
                            <select
                                onChange={e => setRoomSelection(e.target.value)}
                                aria-invalid="false"
                            >
                                <option disabled selected>
                                    Зал/Веранда*
                                </option>
                                <option value="Зал">Зал</option>
                                <option value="Веранда">Веранда</option>
                                <option value="Зал и веранда">Зал и веранда</option>
                            </select>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // !Убрать border у data and time
                                slotProps={{ textField: { variant: "standard" } }}
                                sx={{
                                    width: "100%",
                                    /*svg: {display: "none"},*/
                                    input: { color: "#fff" },

                                    label: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        marginLeft: "6px",
                                    },
                                }}
                                label="Дата*"
                                variant="standard"
                                onChange={e => setDate(`${e["$d"]}`.slice(4, 15))}
                            />
                        </LocalizationProvider>
                        <div>
                            <select
                                onChange={e => setTimeFrom(e.target.value)}
                                aria-invalid="false"
                            >
                                <option disabled selected>
                                    время с *
                                </option>
                                <option value="11 : 00">11 : 00</option>
                                <option value="12 : 00">12 : 00</option>
                                <option value="13 : 00">13 : 00</option>
                                <option value="14 : 00">14 : 00</option>
                                <option value="15 : 00">15 : 00</option>
                                <option value="16 : 00">16 : 00</option>
                                <option value="17 : 00">17 : 00</option>
                                <option value="18 : 00">18 : 00</option>
                                <option value="19 : 00">19 : 00</option>
                                <option value="20 : 00">20 : 00</option>
                                <option value="21 : 00">21 : 00</option>
                                <option value="22 : 00">22 : 00</option>
                                <option value="23 : 00">23 : 00</option>
                                <option value="00 : 00">00 : 00</option>
                                <option value="01 : 00">01 : 00</option>
                                <option value="02 : 00">02 : 00</option>

                            </select>
                            <select
                                onChange={e => setTimeBefore(e.target.value)}
                                aria-invalid="false"
                            >
                                <option disabled selected>
                                    время до *
                                </option>
                                <option value="12 : 00">12 : 00</option>
                                <option value="13 : 00">13 : 00</option>
                                <option value="14 : 00">14 : 00</option>
                                <option value="15 : 00">15 : 00</option>
                                <option value="16 : 00">16 : 00</option>
                                <option value="17 : 00">17 : 00</option>
                                <option value="18 : 00">18 : 00</option>
                                <option value="19 : 00">19 : 00</option>
                                <option value="20 : 00">20 : 00</option>
                                <option value="21 : 00">21 : 00</option>
                                <option value="22 : 00">22 : 00</option>
                                <option value="23 : 00">23 : 00</option>
                                <option value="00 : 00">00 : 00</option>
                                <option value="01 : 00">01 : 00</option>
                                <option value="02 : 00">02 : 00</option>
                                <option value="03 : 00">03 : 00</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" onChange={e => setCountPeople(e.target.value)} placeholder="Число гостей*"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setComment(e.target.value)} placeholder="Коментарий"/>
                        </div>
                        <button onClick={createPreorder}>Оформить заказ</button>
                    </div>
            }

        </div>
    );
};

export default Preorder;
