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
  setClosePasswordReset,
} from "@/redux/slices/authSlice";
import { setExploreOpen} from "@/redux/slices/appSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { GrClose } from "react-icons/gr";
import PasswordReset from "./PasswordReset";
import { Oval } from "react-loader-spinner";
import { AiOutlineDown, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GrMenu } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import ExploreModal from "./ExploreModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [letteEmail, setLetterEmail] = useState("");
  const [showNewsletterForm, setShowForm] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false);

  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  const [
    signupLetter,
    {
      data: signupData,
      isSuccess: letterSuccess,
      isLoading: letterLoading,
      error: signupError,
    },
  ] = useSignUpNewsletterMutation();
  const { data, isSuccess, error } = useLoadUserQuery();
  const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
    useLazyLoadUserQuery();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (signupData) {
      console.log(signupData.success, "Data here");
    }
  }, [signupData]);

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
            console.log("Success ", payload);
          });
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

  const { isExploreOpen } = useSelector((state) => state.app);

  const handleExploreOpen = () => {
    setMenuOpen(false)
    dispatch(setExploreOpen())
  }

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
    <div className="flex justify-center items-start ">
      <div
        className={`${
          isSticky ? `py-0 duration-500 shadow-md ` : `py-4 bg-opacity-0`
        } fixed w-full z-10 flex items-center justify-between bg-white px-3 ss:px-10 max-w-[1500px] `}
      >
        <Link href="/">
          <div className="text-black flex items-center gap-2 font-product">
            <img
              className={` ${
                isSticky
                  ? `w-[40px] h-[40px] duration-500`
                  : `w-[50px] h-[50px]`
              } w-[40px] sm:w-[50] h-[40px] sm:h-[50] `}
              src={"/logo.png"}
              alt="Mordern minds logo"
            />
            <div className=" flex-col hidden xs:flex">
              <h1 className={`font-extrabold text-lg `}>MODERNMINDS</h1>
              <h1 className={` text-base tracking-widest`}>MAGAZINE</h1>
            </div>
          </div>
        </Link>
        <ul className="flex  space-x-1 ss:space-x-2 font-product items-center">
          {!isAuthenticated && (
            <li>
              <button onClick={handleLoginClick}>Signin</button>
            </li>
          )}
          {isAuthenticated && (
            <li className="relative group pr-2">
              <button className="flex gap-1 items-center group-hover:text-gray-800">
                <BsPerson />
                {userInfo?.user.first_name}
                <AiOutlineDown className="text-sm" />
              </button>
              <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-full w-40 py-2 bg-white rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  href="/userprofile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Account settings
                </Link>
                <Link
                  href="manage-subscriptions"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Subscriptions
                </Link>
                <button
                  onClick={handleLogout}
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </li>
          )}
          {userInfo?.user?.is_staff && (
            <li className="hidden sm:block">
              <Link href="/admin">
                <button>Admin</button>
              </Link>
            </li>
          )}
          <li>
            <Link href='/search'>
            <button  className="text-xl border py-1 pb-2 px-2 rounded-md">
              <AiOutlineSearch />
            </button>
            </Link>
          </li>
          <li>
            <Link href="/subscribe">
              <button className="text-white bg-yellow-700 px-2 py-1 rounded-md hidden sm:block">
                Subscribe
              </button>
            </Link>
          </li>
          <li>
            <button
              className="text-white bg-black px-2 py-1 rounded-md hidden sm:block"
              onClick={handleShowForm}
            >
              Get The Newsletter
            </button>
            {showNewsletterForm && (
              <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-75">
                <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="bg-white w-full px-6 py-2 max-w-md space-y-8">
                    <div className="flex justify-end">
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
                        placeholder="Enter you email address"
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
                          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                        >
                          Sign Up
                        </button>
                      )}
                    </form>
                    {letterSuccess &&
                      signupData.success ===
                        "Subscribed, email already verified" && (
                        <div className="bg-green-200 rounded p-2 text-green-800">
                          <p>
                            You have been successfully subscribed to the
                            MordenMinds newsletter. Thank you for subscribing!
                          </p>
                        </div>
                      )}
                    {letterSuccess &&
                      signupData.success ===
                        "Subscribed, verification email sent" && (
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
                      Sign up to our Newsletter to stay updated with special
                      offers and updates for Morden Minds. By signing up, you
                      agree to our{" "}
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
          <li>
            <button
              onClick={() => dispatch(setExploreOpen())}
              className="text-white hover:bg-gray-800 bg-black px-2 py-1 rounded-md hidden sm:block"
            >
              Explore
            </button>
            {isExploreOpen && <ExploreModal />}
          </li>
          <li className=" sm:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-2xl">
              <GrMenu />
            </button>
            {menuOpen && (
              <div className="fixed left-0 right-0 top-0 min-h-screen overflow-y-scroll bg-white z-10 ">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl pt-10 pl-20"
                >
                  <AiOutlineClose />
                </button>

                <div className="menu-container h-screen ">
                  <ul className="text-center">
                    {userInfo?.user?.is_staff && (
                      <li className="">
                        <Link href="/admin">
                          <button>Admin</button>
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link href="/subscribe">
                        <button className="">Subscribe</button>
                      </Link>
                    </li>
                    <li>
                      <button className="" onClick={handleShowForm}>
                        Get The Newsletter
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleExploreOpen()}
                        className=""
                      >
                        Explore
                      </button>
                      {isExploreOpen && <ExploreModal />}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      {loginView && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full px-6 py-2 max-w-md space-y-8">
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
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full  px-6 py-2 max-w-md space-y-8">
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
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full px-6 py-2 max-w-md space-y-4">
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
    </div>
  );
};

export default Navbar;
