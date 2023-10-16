import React from 'react';
import Home from "../pages/Home/Home";
import Main from "../pages/Main/Main";
import Banquet from "../pages/Banquet/Banquet";
import Bar from "../pages/Bar/Bar";
import Hookah from "../pages/Hookah/Hookah";
import AdditionalServices from "../pages/AdditionalServices/AdditionalServices";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Preorder from "../pages/Preorder/Preorder";
import Basket from "../pages/Basket/Basket";
import Stock from "../pages/Stock/Stock";
import List from "../pages/List/List";
import BusinessLunch from "../pages/BusinessLunch/BusinessLunch";
import AdditionalServicesList from "../pages/AdditionalServicesList/AdditionalServicesList";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Основное меню" element={<Main/>}/>
            <Route path="/Банкетное меню" element={<Banquet/>}/>
            <Route path="/Напитки" element={<Bar/>}/>
            <Route path="/list/:type/:subtype" element={<List/>}/>

            <Route path="/Кальянная карта" element={<Hookah/>}/>
            <Route path="/Бизнес ланч" element={<BusinessLunch/>}/>
            <Route path="/Доп Услуги" element={<AdditionalServicesList/>}/>
            <Route path="/Приготовление праздничных блюд" element={<AdditionalServices/>}/>

            <Route path="/preorder" element={<Preorder/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/stock" element={<Stock/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
};

export default Router;
