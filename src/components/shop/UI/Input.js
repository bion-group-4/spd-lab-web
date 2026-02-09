import React from 'react';

const Input = ({ Icon, className = '', ...props }) => {
    return (
        <div className={`relative flex items-center w-full ${className}`}>
             {Icon && (
                <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <input
                className={`w-full bg-gray-100 text-gray-700 border border-transparent focus:bg-white focus:border-gray-500 rounded-lg py-2 ${Icon ? 'pl-10' : 'pl-4'} pr-4 focus:outline-none transition-colors duration-200`}
                {...props}
            />
        </div>
    );
};

export default Input;
