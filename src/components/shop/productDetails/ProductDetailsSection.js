import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";
import { logViewItem, logAddToCart } from "../../../utils/analytics";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext); // Layout Context

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0); // Slide change state

  const [quantitiy, setQuantitiy] = useState(1); // Increse and decrese quantity state
  const [, setAlertq] = useState(false); // Alert when quantity greater than stock

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  ); // Wishlist State Control

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          }); // Dispatch in layout context
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() }); // This function change cart in cart state

          // Analytics: View Item
          logViewItem(responseData.Product);
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct(); // Updating cart total
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products }); // Layout context Cartproduct fetch and dispatch
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  } else if (!sProduct) {
    return <div>No product</div>;
  }
  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      />
      <section className="mx-4 md:mx-12 md:my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images Section */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 justify-center md:justify-start">
              <img
                onClick={(e) =>
                  slideImage("increase", 0, count, setCount, pImages)
                }
                className={`${
                  count === 0 ? "border-yellow-700 ring-1 ring-yellow-700" : "opacity-70"
                } cursor-pointer w-20 h-20 md:w-24 md:h-24 object-cover object-center rounded-xl transition-all duration-300`}
                src={`${apiURL}/uploads/products/${sProduct.pImages[0]}`}
                alt="pic"
              />
              <img
                onClick={(e) =>
                  slideImage("increase", 1, count, setCount, pImages)
                }
                className={`${
                  count === 1 ? "border-yellow-700 ring-1 ring-yellow-700" : "opacity-70"
                } cursor-pointer w-20 h-20 md:w-24 md:h-24 object-cover object-center rounded-xl transition-all duration-300`}
                src={`${apiURL}/uploads/products/${sProduct.pImages[1]}`}
                alt="pic"
              />
            </div>
            {/* Main Image */}
            <div className="relative flex-1 flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full max-h-[500px] object-contain"
                src={`${apiURL}/uploads/products/${sProduct.pImages[count]}`}
                alt="Pic"
              />

              {/* Navigation Arrows (Overlay) */}
              <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
                <div
                  onClick={(e) => slideImage("increase", null, count, setCount, pImages)}
                  className="pointer-events-auto bg-white/80 hover:bg-white p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div
                  onClick={(e) => slideImage("increase", null, count, setCount, pImages)}
                  className="pointer-events-auto bg-white/80 hover:bg-white p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-6 md:py-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                {sProduct.pName}
              </h1>
              <div className="flex items-center justify-between">
                <span className="text-2xl md:text-3xl font-bold text-yellow-700">
                  Rp {sProduct.pPrice}.000
                </span>

                {/* Wishlist Toggle */}
                <div className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200">
                  <svg
                    onClick={(e) => isWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      isWish(sProduct._id, wList) && "hidden"
                    } w-8 h-8 cursor-pointer text-gray-400 hover:text-red-500 transition-colors`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg
                    onClick={(e) => unWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      !isWish(sProduct._id, wList) && "hidden"
                    } w-8 h-8 cursor-pointer text-red-500 fill-current`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed border-t border-b py-4">
              {sProduct.pDescription}
            </p>

            <div className="space-y-4">
              {+quantitiy === +sProduct.pQuantity && (
                <span className="text-sm font-medium text-red-500">Only {sProduct.pQuantity} left in stock!</span>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Quantity Control */}
                <div className={`flex items-center justify-between border rounded-full px-6 py-3 w-full md:w-1/3 ${
                  +quantitiy === +sProduct.pQuantity ? "border-red-500" : "border-gray-300"
                }`}>
                  <span
                    onClick={() => updateQuantity("decrease", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 font-bold text-xl select-none"
                  >
                    -
                  </span>
                  <span className="font-semibold text-xl">{quantitiy}</span>
                  <span
                    onClick={() => updateQuantity("increase", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 font-bold text-xl select-none"
                  >
                    +
                  </span>
                </div>

                {/* Add to Cart Button */}
                {sProduct.pQuantity !== 0 ? (
                  layoutData.inCart !== null && layoutData.inCart.includes(sProduct._id) ? (
                    <button className="flex-1 bg-gray-800 text-white font-bold py-3 px-8 rounded-full opacity-75 cursor-not-allowed text-lg">
                      IN CART
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(
                        sProduct._id,
                        quantitiy,
                        sProduct.pPrice,
                        layoutDispatch,
                        setQuantitiy,
                        setAlertq,
                        fetchData,
                        totalCost
                      );
                      logAddToCart(sProduct, quantitiy);
                    }}
                      className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-0.5"
                    >
                      ADD TO CART
                    </button>
                  )
                ) : (
                   <button disabled className="flex-1 bg-gray-300 text-gray-500 font-bold py-3 px-8 rounded-full cursor-not-allowed text-lg">
                      OUT OF STOCK
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section two */}
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;
