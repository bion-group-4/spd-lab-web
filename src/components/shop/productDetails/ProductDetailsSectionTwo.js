import React, { Fragment, useContext, useEffect, useState } from "react";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";

import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";

import { isAuthenticate } from "../auth/fetchApi";

import "./style.css";

const Menu = () => {
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);

  return (
    <Fragment>
      <div className="flex items-center justify-center space-x-8 border-b border-gray-200 mb-8">
        <div
          onClick={(e) => dispatch({ type: "menu", payload: true })}
          className={`${
            data.menu
              ? "border-b-2 border-black text-black font-bold"
              : "text-gray-500 hover:text-gray-700"
          } px-4 py-4 cursor-pointer text-lg transition-all duration-300`}
        >
          Description
        </div>
        <div
          onClick={(e) => dispatch({ type: "menu", payload: false })}
          className={`${
            !data.menu
              ? "border-b-2 border-black text-black font-bold"
              : "text-gray-500 hover:text-gray-700"
          } px-4 py-4 relative flex cursor-pointer text-lg transition-all duration-300`}
        >
          <span>Reviews</span>
          <span className="absolute -top-1 -right-2 bg-yellow-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {layoutData.singleProductDetail.pRatingsReviews.length}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const RatingReview = () => {
  return (
    <Fragment>
      <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-100 text-red-700 px-6 py-4 rounded-xl mb-4 border border-red-200">
          Please login to write a review.
        </div>
      )}
    </Fragment>
  );
};

const ProductDetailsSectionTwo = (props) => {
  const { data } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);
  const [singleProduct, setSingleproduct] = useState({});

  useEffect(() => {
    setSingleproduct(
      layoutData.singleProductDetail ? layoutData.singleProductDetail : ""
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <section className="m-4 md:mx-12 md:my-16 bg-white">
        <Menu />
        {data.menu ? (
          <div className="mt-6 max-w-4xl mx-auto text-gray-700 leading-relaxed text-lg">
            {singleProduct.pDescription}
          </div>
        ) : (
          <RatingReview />
        )}
      </section>
      <div className="m-4 md:mx-12 md:my-8 flex justify-center items-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
          <span className="text-gray-500 mr-2">Category:</span>
          <span className="font-bold">
            {singleProduct.pCategory ? singleProduct.pCategory.cName : ""}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;
