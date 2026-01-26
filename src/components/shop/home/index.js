import React, { Fragment, createContext, useReducer, useContext, useEffect } from "react";
import Layout, { LayoutContext } from "../layout";
import { useHistory } from "react-router-dom";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  const { dispatch: layoutDispatch } = useContext(LayoutContext);

  useEffect(() => {
    if (
      props.location &&
      props.location.state &&
      props.location.state.openLoginModal
    ) {
      layoutDispatch({ type: "loginSignupModalToggle", payload: true });
      if (props.location.state.from) {
        layoutDispatch({
          type: "loginRedirectUrl",
          payload: props.location.state.from.pathname,
        });
      }
      history.replace({ pathname: props.location.pathname, state: {} });
    }
  }, [props.location, layoutDispatch, history]);

  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
