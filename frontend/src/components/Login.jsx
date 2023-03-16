import { useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setAuthState,
  setCloseLoginViewState,
  setOpenRegisterViewState,
  setIsLogedIn,
  setOpenPasswordReset,
} from "@/redux/slices/authSlice";
import { Oval } from "react-loader-spinner";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    email: formData.email,
    password: formData.password,
  };

  const handleCreateAccountClick = () => {
    dispatch(setCloseLoginViewState());
    dispatch(setOpenRegisterViewState());
  };

  const handleForgotPassword = () => {
    dispatch(setCloseLoginViewState());
    dispatch(setOpenPasswordReset());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        await login(body)
          .unwrap()
          .then((payload) => {
            setFormData(initialFormData);
            dispatch(setAuthState());
            dispatch(setIsLogedIn());
            dispatch(setCloseLoginViewState());
            router.push("/");
          });
      } catch (err) {
        console.error("Failed to login: ", err);
      }
    }
  };

  return (
    <>
      <div>
        <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form
        className="mt-8 space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="remember" value="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              required
              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {error &&
            error.data.err.message ===
              "Request failed with status code 401" && (
              <div className="text-red-500 mt-2">
                Incorrect email or password
              </div>
            )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex justify-center mt-5">
              <Oval
                height={40}
                width={40}
                color="blue"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          ) : (
            <button
              type="submit"
              className=" group relative flex w-full justify-center border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          )}
        </div>
      </form>
      <div className="">
        <p className="text-center">
          Don't have an account?{" "}
          <span className=" text-indigo-600">
            <Link onClick={handleCreateAccountClick} href="">
              Create an account
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
