import React, {useEffect, useState} from 'react';
import './Preorder.scss'
import RegisterActive from "../../components/RegisterActive/RegisterActive";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {api} from "../../api";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";

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
    const [time, setTime] = useState('');
    const [countPeople, setCountPeople] = useState('');
    const [comment, setComment] = useState('');

    let timeWatch = time.slice(1, 3)

    let arrPreorder = [
        name,
        phone,
        email,
        eventDesc,
        roomSelection,
        date,
        time,
        countPeople,
        roomSelection === 'Зал' && countPeople >= 27 ? '' : 27,
        roomSelection === 'Веранда' && countPeople >= 51 ? '' : 51,
    ]
    let arrLenght = arrPreorder.map(e => e.length)
    let arrBoolean =  arrLenght.includes(0);

    const arrWatch = ["04", "05", "06", "07", "08", "09", "10"]

    const createOrder = () => {
        if (!name) {
            alert('Имя: Вы не указали имя')
            return
        }
        if (!phone) {
            alert('Телефон: Вы не указали номер телефона')
            return
        }
        if (!email) {
            alert('Почта: Вы не указали почту')
            return
        }
        if (!eventDesc) {
            alert('Событие: Вы не указали тип события ')
            return
        }
        if (!roomSelection) {
            alert('Зал или Веранда: Укажите тип помещения ')
            return
        }
        if (!date) {
            alert('Дата: Вы не указали дату')
            return
        }
        if (!time) {
            alert('Время : Вы не указали время')
            return
        }
        if (!countPeople) {
            alert('Число гостей: Введите число гостей')
            return
        }
        if (roomSelection === 'Зал' && countPeople >= 27) {
            alert('Зал: Количество гостей в зале не должно превышать  26 человек')
            return
        }
        if (roomSelection === 'Веранда' && countPeople >= 51) {
            alert('Веранда: Количество гостей на веранда не должно превышать  50 человек')
            return
        }
    }

    useEffect(() => {
        if (arrWatch.includes(timeWatch.toString())) {
            alert('Некоректное время: Заведение работает с 11:00 до 3:00')
            return
        }
    }, [timeWatch])

   /* const dateDay = new Intl.DateTimeFormat("ru", {day: "numeric"}).format(new Date())
    const dateMonth = new Intl.DateTimeFormat("ru", {month: "numeric"}).format(new Date())
    const dateYear = new Intl.DateTimeFormat("ru", {year: "numeric"}).format(new Date())
    console.log(dateDay,dateMonth,dateYear, 'dateDay,dateMonth,dateYear')*/

    const createPreorder = () => {
        arrWatch.includes(timeWatch.toString()) ?  alert('Некоректное время: Заведение работает с 11:00 до 3:00')
        : arrBoolean ?  createOrder()
        : api.sendPreorderApi.createPreorder({
            date: date + ` time: ${time}`,
            first_name: name,
            phone: phone,
            email_user: email,
            event: eventDesc,
            hall: roomSelection,
            count_people:countPeople,
            additional_services: comment
        }).then(res => {
            setPreorder(true)
            setTimeout(()=>{
                navigate("/")
            }, 2000)
        })
    }
    const yesterday = dayjs().subtract(1, 'day');

    return (
        <div className="preorder">
            {
                preorder
                ? <RegisterActive desc="Заказ оформлен"/>
                    :  <div className="preorder__container">
                        <p>Предзаказ банкета</p>
                        <div>
                            <input value={name} type="text" onChange={e => setName(e.target.value)} placeholder="Имя*"/>
                        </div>
                        <div>
                            <input type="text" value={me.phone}  onChange={e => setPhone(e.target.value)} placeholder="Телефон*"/>
                        </div>
                        <div>
                            <input type="text" value={me.email} onChange={e => setEmail(e.target.value)} placeholder="Почта*"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setEventDesc(e.target.value)} placeholder="Событие*"/>
                        </div>
                        <div>
                            <select
                                onChange={e => setRoomSelection(e.target.value)}
                                aria-invalid="false"
                            >
                                <option disabled selected>Зал/Веранда*</option>
                                <option value="Зал">Зал</option>
                                <option value="Веранда">Веранда</option>
                            </select>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                                <DatePicker
                                    // !Убрать border у data and time
                                    disablePast
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
                                    label={date ? "" : "Дата*"}
                                    variant="standard"
                                    onChange={e => setDate(`${e["$d"]}`.slice(4, 15))}
                                />
                                <TimePicker
                                    // !Убрать border у data and time
                                    slotProps={{ textField: { variant: "standard" } }}
                                    sx={{
                                        width: "100%",
                                        svg: { color: "#fff" },
                                        input: { color: "#fff" },
                                        label: {
                                            color: "#fff",
                                            fontSize:
                                                "calc(15px + 12 * ((100vw - 320px) / (1920 - 320)))",
                                            fontFamily: "Lato",
                                            marginLeft: "6px",
                                        },
                                    }}
                                    label={time ? "" : "Время*"}
                                    ampm={false}
                                    onChange={e => setTime(`${e["$d"]}`.slice(15, 21))}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div>
                            <input type="number" onChange={e => setCountPeople(e.target.value)} placeholder="Число гостей*"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setComment(e.target.value)} placeholder="Коментарий/необязательно"/>
                        </div>
                        <button onClick={createPreorder}>Оформить заказ</button>
                    </div>
            }

        </div>
    );
};

export default Preorder;
