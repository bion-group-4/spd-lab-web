import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";
import { getAllCategory } from "../../admin/categories/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const Footer = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        // Limit to 4 categories for the footer to keep it clean
        setCategories(responseData.Categories.slice(0, 4));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white tracking-wider uppercase">
              Our Store
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop destination for premium products. We are dedicated to
              providing the best quality and service to our customers. Shop with
              confidence and style.
            </p>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white tracking-wider uppercase">
              Top Categories
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {categories && categories.length > 0 ? (
                categories.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 cursor-pointer hover:text-white transition-colors duration-200"
                  >
                    {item.cImage && (
                      <img
                        src={`${item.cImage}`}
                        alt={item.cName}
                        className="w-6 h-6 object-cover rounded-full border border-gray-600 flex-shrink-0 mt-0.5 bg-white p-0.5"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <span className="text-sm capitalize leading-tight">
                      {item.cName}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-500">Loading...</span>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <p>
                <span className="font-semibold text-gray-300">Address:</span>{" "}
                123 E-Commerce St, Digital City, 10101
              </p>
              <p>
                <span className="font-semibold text-gray-300">Email:</span>{" "}
                support@onlinestore.com
              </p>
              <p>
                <span className="font-semibold text-gray-300">Phone:</span>{" "}
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {moment().format("YYYY")} Online Store. All Rights Reserved.
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
