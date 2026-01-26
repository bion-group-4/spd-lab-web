import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category }) => {
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center">
          <div className="text-sm flex space-x-3">
            <span
              className="hover:text-yellow-700 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span className="text-yellow-700 cursor-default">{category}</span>
          </div>
          <div>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

const AllProduct = ({ products }) => {
  const history = useHistory();
  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";
  return (
    <Fragment>
      <Submenu category={category} />
      <section className="m-4 md:mx-8 md:my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="relative col-span-1 m-2 group">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative overflow-hidden">
                      <img
                        onClick={(e) => history.push(`/products/${item._id}`)}
                        className="w-full h-64 object-cover object-center cursor-pointer transform group-hover:scale-105 transition-transform duration-500"
                        src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                        alt={item.pName}
                      />

                      <div className="absolute top-3 right-3 z-10">
                         <div className="cursor-default p-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
                             <span className="text-gray-900 font-bold text-xs">{item.pCategory.cName}</span>
                         </div>
                      </div>

                    </div>

                    <div className="p-4">
                       <div className="flex items-center justify-between mb-2">
                        <h3
                          onClick={(e) => history.push(`/products/${item._id}`)}
                          className="text-gray-900 font-bold text-lg truncate cursor-pointer hover:text-gray-700 transition-colors"
                        >
                          {item.pName}
                        </h3>
                       </div>

                       <div className="flex justify-between items-center mt-3">
                         <span className="text-xl font-bold text-gray-900">
                            Rp {item.pPrice}.000
                         </span>
                         <div className="flex items-center space-x-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            <svg
                              className="w-3 h-3 text-yellow-500 fill-current"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{item.pRatings ? item.pRatings.length : 0}</span>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
            No product found
          </div>
        )}
      </section>
    </Fragment>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} />
    </Fragment>
  );
};

const ProductByCategory = (props) => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;
