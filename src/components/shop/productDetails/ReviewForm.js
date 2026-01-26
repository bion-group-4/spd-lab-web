import React, { Fragment, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Alert, reviewSubmitHanlder } from "./Action";
import { LayoutContext } from "../layout";
import { isAuthenticate } from "../auth/fetchApi";
import { getSingleProduct } from "./FetchApi";

const ReviewForm = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  let { id } = useParams(); // Product Id

  const [fData, setFdata] = useState({
    rating: "",
    review: "",
    error: false,
    success: false,
    pId: id,
  });

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, error: false, success: false });
    }, 3000);
  }

  const fetchData = async () => {
    try {
      let responseData = await getSingleProduct(id);
      if (responseData.Product) {
        dispatch({
          type: "singleProductDetail",
          payload: responseData.Product,
        });
        console.log(data);
      }
      if (responseData.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ratingUserList = data.singleProductDetail.pRatingsReviews.map(
    (item) => {
      return item.user ? item.user._id : "";
    }
  );

  return (
    <Fragment>
      <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
        {fData.error ? Alert("red", fData.error) : ""}
        {fData.success ? Alert("green", fData.success) : ""}
      </div>
      {ratingUserList.includes(isAuthenticate().user._id) ? (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24"></div>
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 flex flex-col bg-gray-50 p-6 md:p-8 rounded-2xl">
          <div className="flex flex-col space-y-2 mb-6">
             <h3 className="text-2xl font-bold text-gray-900">Add a review</h3>
            <span className="text-gray-500 text-sm">
              Your email address will not be published. Required fields are
              marked *
            </span>
          </div>
          {/* Input Rating */}
          <div className="mb-6">
             <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Rating</label>
            <fieldset
              onChange={(e) => setFdata({ ...fData, rating: e.target.value })}
              className="rating"
            >
              <input
                type="radio"
                className="rating"
                id="star5"
                name="rating"
                defaultValue={5}
              />
              <label
                className="full"
                htmlFor="star5"
                title="Awesome - 5 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star4"
                name="rating"
                defaultValue={4}
              />
              <label
                className="full"
                htmlFor="star4"
                title="Pretty good - 4 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star3"
                name="rating"
                defaultValue={3}
              />
              <label className="full" htmlFor="star3" title="Meh - 3 stars" />
              <input
                type="radio"
                className="rating"
                id="star2"
                name="rating"
                defaultValue={2}
              />
              <label
                className="full"
                htmlFor="star2"
                title="Kinda bad - 2 stars"
              />
              <input
                type="radio"
                className="rating"
                id="star1"
                name="rating"
                defaultValue={1}
              />
              <label
                className="full"
                htmlFor="star1"
                title="Sucks big time - 1 star"
              />
            </fieldset>
          </div>
          {/* Review Form */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="textArea" className="text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                Review <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={(e) => setFdata({ ...fData, review: e.target.value })}
                value={fData.review}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                name="textArea"
                id="textArea"
                cols={30}
                rows={4}
                placeholder="What did you think about this product?"
              />
            </div>
            <button
              onClick={(e) => reviewSubmitHanlder(fData, setFdata, fetchData)}
              className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 outline-none"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewForm;
