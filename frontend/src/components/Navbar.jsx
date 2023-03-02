import { useState, useEffect } from "react";
import {
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
} from "@/redux/api/authApi";
import {
  setLogoutState,
  setAuthState,
  setOpenLoginViewState,
  setCloseLoginViewState,
  setCloseRegisterViewState,
  setCloseIsLogedIn
} from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(null);

  const { isAuthenticated, loginView, registerView, isLogedIn } = useSelector(
    (state) => state.auth
  );

  const [logout, {isSuccess: logoutSuccess}] = useLogoutMutation();

  const { data, isSuccess, error } = useLoadUserQuery();

  const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
    useLazyLoadUserQuery();

  const handleLoginClick = (e) => {
    e.preventDefault;
    dispatch(setOpenLoginViewState());
  };

  useEffect(() => {
    if (logoutSuccess) {
      // dispatch(setCloseIsLogedIn())
      window.location.reload()
    }
  }, [logoutSuccess])

  useEffect(() => {
    if (isLogedIn) {
      fetchUser();
    }
    if (success) {
      setUserInfo(lazyData);
      dispatch(setAuthState());
    }
    if (isSuccess) {
      setUserInfo(data);
      dispatch(setAuthState());
    }
  }, [isLogedIn, success, lazyData, data, isSuccess]);

  useEffect(() => {
    if (isAuthenticated === false) {
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    logout();
    setUserInfo(null);
    dispatch(setLogoutState());
  };

  return (
    <>
      <div className="flex items-center space-x-2 h-10 bg-slate-200">
        <h1>Welcome to MordenMinds</h1>
        <ul className="flex space-x-2">
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <button onClick={handleLoginClick}>Login/Register</button>
            </li>
          )}
          <li>{userInfo?.user.first_name}</li>
        </ul>
      </div>
      {loginView && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
              <div className="flex justify-end">
                <button
                  className="justify-end"
                  onClick={() => dispatch(setCloseLoginViewState())}
                >
                  <GrClose className="text-2xl mt-2" />
                </button>
              </div>
              <Login />
            </div>
          </div>
        </div>
      )}
      {registerView && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
              <div className="flex justify-end">
                <button
                  className="justify-end"
                  onClick={() => dispatch(setCloseRegisterViewState())}
                >
                  <GrClose className="text-2xl mt-2" />
                </button>
              </div>
              <Register />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
