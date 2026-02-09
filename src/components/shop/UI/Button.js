import React from 'react';
import { useHistory } from 'react-router-dom';

const Button = ({ children, className = '', style, onClick, to, type = 'button', variant = 'primary', ...props }) => {
    const history = useHistory();

    const baseStyle = "px-6 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
        outline: "border-2 border-black text-black hover:bg-black hover:text-white focus:ring-gray-500 bg-transparent",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };

    const combinedClassName = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;

    const handleClick = (e) => {
        if (to) {
            history.push(to);
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            type={type}
            className={combinedClassName}
            style={style}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
