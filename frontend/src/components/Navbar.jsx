import { useState, useEffect } from "react";
import {
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
} from "@/redux/api/authApi";
import { useSignUpNewsletterMutation } from "@/redux/api/generalApi";
import {
  setLogoutState,
  setAuthState,
  setOpenLoginViewState,
  setCloseLoginViewState,
  setCloseRegisterViewState,
  setCloseIsLogedIn,
  setOpenPasswordReset,
  setClosePasswordReset,
} from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { GrClose } from "react-icons/gr";
import PasswordReset from "./PasswordReset";
import { Oval } from "react-loader-spinner";

const Navbar = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [letteEmail, setLetterEmail] = useState("");
  const [showNewsletterForm, setShowForm] = useState(false);

  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();
  const [
    signupLetter,
    {data: signupData, isSuccess: letterSuccess, isLoading: letterLoading, error: signupError },
  ] = useSignUpNewsletterMutation();
  const { data, isSuccess, error } = useLoadUserQuery();
  const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
    useLazyLoadUserQuery();

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  
  useEffect(() => {
    if (signupData) {
      console.log(signupData.success, "Data here")
    }
  }, [signupData])

  const letterBody = {
    email: letteEmail,
  };
  const handleSubmitNewsletter = async (event) => {
    event.preventDefault();
    if (letterBody) {
      try {
        await signupLetter(letterBody)
        .unwrap()
        .then((payload) => {
          console.log("Success ",payload)
        })
      } catch (err) {
        console.error("Failed to sign up for newsletter: ", err);
        console.log(signupError, "There have been an error");
      }
    }
  };

  const {
    isAuthenticated,
    loginView,
    registerView,
    isLogedIn,
    resetPasswordRequest,
  } = useSelector((state) => state.auth);

  const handleLoginClick = (e) => {
    e.preventDefault;
    dispatch(setOpenLoginViewState());
  };

  useEffect(() => {
    if (logoutSuccess) {
      window.location.reload();
    }
  }, [logoutSuccess]);

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
      setLetterEmail(data.user.email);
      dispatch(setAuthState());
    }
  }, [isLogedIn, success, lazyData, data, isSuccess]);

  useEffect(() => {
    if (isAuthenticated === false) {
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setUserInfo(null);
    dispatch(setLogoutState());
  };

  return (
    <>
      <div className={`font-kinfolk flex items-center space-x-2 h-10 bg-slate-200 `}>
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
          {isAuthenticated && (
            <li className="relative group hover:bg-gray-100">
              <button className=" group-hover:text-gray-800">
                {userInfo?.user.first_name}
              </button>
              <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-full w-40 py-2 bg-white rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  href="/userprofile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Account settings
                </Link>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Subscriptions
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            </li>
          )}
          {userInfo?.user?.is_staff && (
            <li>
              <Link href="/admin">
                <button>Admin</button>
              </Link>
            </li>
          )}
          <li>
            <button className="" onClick={handleShowForm}>
              Get the newsletter
            </button>
            {showNewsletterForm && (
              <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
                <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
                    <div className="flex justify-end bg">
                      <button onClick={handleCloseForm}>
                        <GrClose className="text-2xl mt-2" />
                      </button>
                    </div>
                    <form onSubmit={handleSubmitNewsletter}>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={letteEmail}
                        onChange={(event) => setLetterEmail(event.target.value)}
                        required
                        className="border border-gray-400 py-2 px-4 rounded w-full mb-4"
                      />
                      {letterLoading ? (
                        <Oval
                          height={30}
                          width={30}
                          color="blue"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#4fa94d"
                          strokeWidth={4}
                          strokeWidthSecondary={4}
                        />
                      ) : (
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Sign Up
                        </button>
                      )}
                    </form>
                    {letterSuccess && signupData.success === "Subscribed, email already verified" && (
                      <div className="bg-green-200 rounded p-2 text-green-800">
                        <p>
                          You have been successfully subscribed to the MordenMinds newsletter. Thank you for subscribing!
                        </p>
                      </div>
                    )}
                    {letterSuccess && signupData.success === "Subscribed, verification email sent" && (
                      <div className="bg-green-200 rounded p-2 text-green-800">
                        <p>
                          Check your inbox, we sent you a link to verify your
                          email
                        </p>
                      </div>
                    )}
                    {signupError && (
                      <div className="bg-green-200 rounded p-2 text-green-800">
                        {signupError.data.error ===
                          "Email already subscribed to newsletter" && (
                          <p>
                            Your email is already subcribed to the newsletter
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-sm mt-4">
                      Sign up to stay updated with special offers and updates
                      for Morden Minds. By signing up, you agree to our{" "}
                      <a href="terms-of-use" className="underline">
                        Terms of Use
                      </a>{" "}
                      and acknowledge that you have read our{" "}
                      <a href="privacy-policy" className="underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}
          </li>
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
      {resetPasswordRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-4">
              <div className="flex justify-end">
                <button
                  className="justify-end"
                  onClick={() => dispatch(setClosePasswordReset())}
                >
                  <GrClose className="text-2xl mt-2" />
                </button>
              </div>
              <PasswordReset />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
