import React from 'react';
import { useSelector } from 'react-redux';

export const NavBar = (props) => {
    const user = useSelector((state) => state.user.user);

    return (
        <div>הי {user?.userName}</div>
    );
};
