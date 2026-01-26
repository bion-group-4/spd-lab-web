import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate, isAdminCheck } from "./fetchApi";

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const auth = isAuthenticate();
      if (auth) {
        const isAdmin = await isAdminCheck();
        if (isAdmin && isAdmin.success) {
          setIsAuth(true);
        }
      }
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
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
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location, openLoginModal: true },
            }}
          />
        )
      }
    />
  );
};

export default AdminProtectedRoute;
