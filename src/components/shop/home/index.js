import React, { Fragment, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { getAllProduct } from "../../admin/products/FetchApi";
import { getAllCategory } from "../../admin/categories/FetchApi";
import ProductCard from "../UI/ProductCard";
import Button from "../UI/Button";

const apiURL = process.env.REACT_APP_API_URL;

const HomeComponent = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            let responseData = await getAllProduct();
            if (responseData && responseData.Products) {
                // Filter for featured or just take first 4-8
                setProducts(responseData.Products.slice(0, 8));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            let responseData = await getAllCategory();
            if (responseData && responseData.Categories) {
                setCategories(responseData.Categories.slice(0, 5)); // Limit categories for display
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                 <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        Unleash Your <br/> <span className="text-blue-400">Potential</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Discover the best products to elevate your lifestyle. Quality, style, and performance - all in one place.
                    </p>
                    <Button
                        onClick={() => history.push("/shop")}
                        className="!rounded-full !px-8 !py-3 !text-lg bg-white text-black hover:bg-gray-100 border-none"
                    >
                        Shop Now
                    </Button>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat, index) => (
                             <Button
                                key={index}
                                variant="outline"
                                onClick={() => history.push(`/products/category/${cat._id}`)}
                                className="!rounded-full !border-gray-200 hover:!border-black hover:!bg-black hover:!text-white transition-all text-sm font-medium px-6"
                            >
                                {cat.cName}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

             {/* Featured Products Section */}
            <section className="py-8 bg-gray-50/50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-8">
                         <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                            <p className="text-gray-500 mt-2">Handpicked selections just for you</p>
                         </div>
                         <Button
                            variant="outline"
                            onClick={() => history.push("/shop")}
                            className="hidden md:flex"
                        >
                            View All
                        </Button>
                    </div>

                    {loading ? (
                         <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                         </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-12">
                                    No products found.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Button
                            variant="outline"
                            onClick={() => history.push("/shop")}
                            className="w-full"
                        >
                            View All Products
                        </Button>
                    </div>
                </div>
            </section>

        </Fragment>
    );
};

const Home = (props) => {
  return (
    <Layout>
      <HomeComponent />
    </Layout>
  );
};

export default Home;
