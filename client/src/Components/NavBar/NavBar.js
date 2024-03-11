import React, { useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import logo from '../../images/Logo.png';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ currentUser }) => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">
                <i> <img src={logo} width={180} /></i>
            </h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={active ? "nav-menu active" : "nav-menu"}>
                {menuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a href={item.url} className={item.cName}>
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
            {currentUser?.userName && <span className="user-name">Hi {currentUser?.userName}</span>}
            <Button onClick={() => navigate('/signup')}>
                SIGN UP
            </Button>
        </nav>
    );
};
