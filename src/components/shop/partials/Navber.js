import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";
import Input from "../UI/Input";
import SearchIcon from "../UI/icons/SearchIcon";
import RecipeIcon from "../UI/icons/RecipeIcon";
import CartIcon from "../UI/icons/CartIcon";
import LoginIcon from "../UI/icons/LoginIcon";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);
  const [dropdown, setDropdown] = useState(false);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const handleSearch = (e) => {
      // Placeholder for search logic
      console.log("Search:", e.target.value);
  }

  return (
    <Fragment>
      <header className="flex flex-col gap-6 border-b border-gray-100 py-3 sticky top-0 bg-white z-50">
        <div className="flex justify-between items-center flex-wrap gap-3 max-w-screen-xl mx-auto w-full px-4">
            {/* Logo */}
            <div
                className="flex items-center cursor-pointer"
                onClick={() => history.push("/")}
            >
                <span className="text-2xl font-black tracking-tight text-gray-900">
                    Four <span className="text-blue-600">Shop</span>
                </span>
            </div>

            {/* Search Bar (Hidden on mobile, visible on desktop) */}
            <div className="hidden md:block flex-1 max-w-sm mx-4">
                <Input
                    Icon={SearchIcon}
                    placeholder="Search products..."
                    onChange={handleSearch}
                />
            </div>

             {/* Actions */}
             <div className="flex items-center gap-6">
                 {/* Track Order */}
                <div
                    onClick={() => history.push("/track-order")}
                    className="flex flex-col items-center justify-center cursor-pointer group hover:text-blue-600 transition-colors"
                >
                    <RecipeIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    <span className="text-xs font-medium text-gray-500 mt-1">Track</span>
                </div>

                {/* Cart */}
                <div
                    onClick={cartModalOpen}
                    className="flex flex-col items-center justify-center cursor-pointer group relative hover:text-blue-600 transition-colors"
                >
                    <div className="relative">
                        <CartIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                        {data.cartProduct && data.cartProduct.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {data.cartProduct.length}
                            </span>
                        )}
                    </div>
                    <span className="text-xs font-medium text-gray-500 mt-1">Cart</span>
                </div>

                {/* User / Login */}
                {localStorage.getItem("jwt") ? (
                    <div className="relative">
                         <div
                            onClick={() => setDropdown(!dropdown)}
                            className="flex flex-col items-center justify-center cursor-pointer group hover:text-blue-600 transition-colors"
                        >
                            <LoginIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                            <span className="text-xs font-medium text-gray-500 mt-1">Account</span>
                        </div>

                        {/* Dropdown */}
                        {dropdown && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                                onMouseLeave={() => setDropdown(false)}
                            >
                                {!isAdmin() ? (
                                    <>
                                        <div onClick={() => history.push("/user/orders")} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">My Orders</div>
                                        <div onClick={() => history.push("/user/profile")} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">My Account</div>
                                        <div onClick={() => history.push("/wish-list")} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">My Wishlist</div>
                                        <div onClick={() => history.push("/user/setting")} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">Settings</div>
                                    </>
                                ) : (
                                     <div onClick={() => history.push("/admin/dashboard")} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">Admin Dashboard</div>
                                )}
                                <div className="border-t border-gray-100 my-1"></div>
                                <div onClick={() => logout()} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-red-600 font-medium">Logout</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={loginModalOpen}
                        className="flex flex-col items-center justify-center cursor-pointer group hover:text-blue-600 transition-colors"
                    >
                         <LoginIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" style={{ transform: 'scaleX(-1)' }} />
                         <span className="text-xs font-medium text-gray-500 mt-1">Login</span>
                    </div>
                )}
             </div>
        </div>

        {/* Mobile Search & Nav */}
        <div className="md:hidden px-4 pb-3">
             <Input
                Icon={SearchIcon}
                placeholder="Search..."
                onChange={handleSearch}
            />
        </div>
      </header>
    </Fragment>
  );
};

export default Navber;
