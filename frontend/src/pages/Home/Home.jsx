import React, {useEffect, useState} from 'react';
import "./Home.scss"
import {Link} from "react-router-dom";
import {api} from "../../api";
import Output from "../../assets/images/home/output.gif"

const Home = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        api.goodsApi.getGoodsTypes({}).then(resp => {
            setTypes(resp.data)
        })
    }, []);

    return (
        <div className="home">
            <div className="home__container">
                <div className="home__container_baner">
                    <img src={Output} alt="Output"/>
                </div>
                {
                    types.map((type, idx) => <div key={idx} className="home__container_item">
                        <Link key={idx} to={type.name === "Доставка" ? "https://tyteda.ru/" : type.name}>
                            {type.name}
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;
