import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { getAllProduct } from "../../admin/products/FetchApi";
import ProductCard from "../UI/ProductCard";

const ShopComponent = () => {
    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            let responseData = await getAllProduct();
            if (responseData && responseData.Products) {
                setProducts(responseData.Products);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
             {/* Submenu Section */}
             <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
                <div className="flex justify-between items-center">
                    <div className="text-sm flex space-x-3">
                        <span
                            className="hover:text-yellow-700 cursor-pointer"
                            onClick={() => history.push("/")}
                        >
                            Home
                        </span>
                        <span className="text-yellow-700 cursor-default">Shop</span>
                    </div>
                </div>
            </section>

            <section className="m-4 md:mx-8 md:my-4">
                <div className="mb-4">
                     <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                No products found.
                            </div>
                        )}
                    </div>
                )}
            </section>
        </Fragment>
    );
};

const ShopPage = (props) => {
  return (
    <Layout>
      <ShopComponent />
    </Layout>
  );
};

export default ShopPage;
