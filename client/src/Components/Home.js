import React from 'react';
import handsImg from '../images/hands.jpg'
import logo from '../images/Logo.png';

export const Home = (props) => {

    return (
        <div className='home-page'>
            <img src={handsImg} className='hands-img' alt="Spare DN"/>
            <img src={logo} className='logo-img'/>
        </div>
    );
};
