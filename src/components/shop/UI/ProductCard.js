import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderImage } from '../../../utils/imageUrl';
import { isWishReq, unWishReq, isWish } from '../home/Mixins'; // Adjust import path if needed
import StarIcon from './icons/StarIcon';

const ProductCard = ({ product }) => {
    const history = useHistory();
    const [wList, setWlist] = useState(
        JSON.parse(localStorage.getItem("wishList"))
    );

    const handleWishlist = (e, type) => {
        e.stopPropagation();
        if (type === 'add') {
             isWishReq(e, product._id, setWlist);
        } else {
             unWishReq(e, product._id, setWlist);
        }
    };

    return (
        <div
            onClick={() => history.push(`/products/${product._id}`)}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={renderImage(product.pImages[0], "products")}
                    alt={product.pName}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                     {!isWish(product._id, wList) ? (
                        <button
                            onClick={(e) => handleWishlist(e, 'add')}
                            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-200 text-gray-600 hover:text-red-500"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                     ) : (
                        <button
                            onClick={(e) => handleWishlist(e, 'remove')}
                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 shadow-sm transition-all duration-200 text-red-500"
                        >
                             <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </button>
                     )}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-gray-900 font-bold text-lg truncate pr-2 group-hover:text-blue-600 transition-colors">
                        {product.pName}
                    </h3>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        Rp {product.pPrice.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{product.pRatingsReviews ? product.pRatingsReviews.length : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
