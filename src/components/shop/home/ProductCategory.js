import React, { Fragment, useContext } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";

const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center py-4 px-4 md:px-12">
        <div
          onClick={(e) =>
            dispatch({
              type: "categoryListDropdown",
              payload: !data.categoryListDropdown,
            })
          }
          className={`group flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-full transition-colors ${
            data.categoryListDropdown ? "bg-gray-100 text-black font-bold" : "hover:bg-gray-50 text-gray-600 hover:text-black"
          }`}
        >
          <span className="text-lg font-medium">Categories</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${data.categoryListDropdown ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        <div className="flex items-center space-x-4">
          <div
            onClick={(e) =>
              dispatch({
                type: "filterListDropdown",
                payload: !data.filterListDropdown,
              })
            }
            className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-full transition-colors ${
              data.filterListDropdown ? "bg-gray-100 text-black font-bold" : "hover:bg-gray-50 text-gray-600 hover:text-black"
            }`}
          >
            <span className="text-md md:text-lg font-medium">Filter</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          <div
            onClick={(e) =>
              dispatch({
                type: "searchDropdown",
                payload: !data.searchDropdown,
              })
            }
            className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-full transition-colors ${
              data.searchDropdown ? "bg-gray-100 text-black font-bold" : "hover:bg-gray-50 text-gray-600 hover:text-black"
            }`}
          >
            <span className="text-md md:text-lg font-medium">Search</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <ProductCategoryDropdown />
    </div>
  );
};

export default ProductCategory;
