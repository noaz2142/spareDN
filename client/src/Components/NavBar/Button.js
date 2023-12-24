import React from "react";

const STYLES = ["btn-primary", "btn-outline"];

const SIZES = ["btn-medium", "btn-large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const _onClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            type={type}
            onClick={_onClick}
        >
            {children}
        </button>
    );
};

export default Button;
