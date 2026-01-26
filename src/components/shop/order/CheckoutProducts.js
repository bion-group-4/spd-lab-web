import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getPaymentProcess } from "./FetchApi";
import { fetchData, pay } from "./Action";



const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null, // Kept for compatibility if needed, but not primarily used
    instance: {}, // Not needed for Midtrans, but keeping structure minimal
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    // Removed fetchbrainTree call
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
        Please wait untill finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Order Summary */}
          <div className="md:w-3/5">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
               <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Order Summary</h2>
               <CheckoutProducts products={data.cartProduct} />
            </div>
          </div>

          {/* Right Column: Shipping Details */}
          <div className="md:w-2/5">
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 sticky top-32">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Shipping Details</h2>

              {state.error ? (
                <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg mb-4 text-sm font-medium">
                  {state.error}
                </div>
              ) : (
                ""
              )}

              <div className="flex flex-col mb-4">
                <label htmlFor="address" className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Delivery Address
                </label>
                <input
                  value={state.address}
                  onChange={(e) =>
                    setState({
                      ...state,
                      address: e.target.value,
                      error: false,
                    })
                  }
                  type="text"
                  id="address"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="flex flex-col mb-8">
                <label htmlFor="phone" className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  value={state.phone}
                  onChange={(e) =>
                    setState({
                      ...state,
                      phone: e.target.value,
                      error: false,
                    })
                  }
                  type="number"
                  id="phone"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="e.g. 0812..."
                />
              </div>

              <div
                onClick={(e) =>
                  pay(
                    data,
                    dispatch,
                    state,
                    setState,
                    getPaymentProcess,
                    totalCost,
                    totalCost,
                    history,
                    enqueueSnackbar
                  )
                }
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center cursor-pointer text-lg"
              >
                Pay Now
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="flex flex-col space-y-6">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-shrink-0">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="w-24 h-24 object-cover object-center rounded-xl border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt={product.pName}
                  />
                </div>

                <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center">
                    <div className="flex flex-col mb-2 md:mb-0">
                        <h3 onClick={(e) => history.push(`/products/${product._id}`)} className="text-lg font-bold text-gray-900 cursor-pointer hover:underline">
                            {product.pName}
                        </h3>
                        <span className="text-gray-500 text-sm mt-1">
                            Rp {product.pPrice}.000 x {quantity(product._id)}
                        </span>
                    </div>

                    <div className="text-right">
                         <span className="text-lg font-bold text-gray-900 block">
                            Rp {subTotal(product._id, product.pPrice)}.000
                         </span>
                         <span className="text-xs text-gray-500 font-medium">Subtotal</span>
                    </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
             No products found for checkout
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
