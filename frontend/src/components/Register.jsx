import { useEffect, useState } from "react";
import {
  useRegisterMutation,
  useGetCountriesQuery,
} from "@/redux/api/generalApi";
import { Oval, ThreeDots } from "react-loader-spinner";
import {
  setCloseRegisterViewState,
  setOpenLoginViewState,
} from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  const [countries, setCounties] = useState(null);
  const dispatch = useDispatch();
  const [register, { isLoading, isSuccess, isError: isRegisterError, error }] =
    useRegisterMutation();
  const { data, isSuccess: countriesSuccess, isError } = useGetCountriesQuery();

  const [focused, setFocused] = useState({
    first_name: false,
    last_name: false,
    email: false,
    country: false,
    gender: false,
    password: false,
    re_password: false,
  });

  const handleFocused = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (countriesSuccess) {
      setCounties(data);
    }
  }, [data, countriesSuccess]);

  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    gender: "",
    password: "",
    re_password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const {
    first_name,
    last_name,
    email,
    country,
    gender,
    password,
    re_password,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    country: formData.country,
    gender: formData.gender,
    password: formData.password,
    re_password: formData.re_password,
  };

  const handleSigninClick = () => {
    dispatch(setCloseRegisterViewState());
    dispatch(setOpenLoginViewState());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        if (body.password !== body.re_password) {
          alert("Password mismatch");
        }

        await register(body)
          .unwrap()
          .then((payload) => {
            console.log("fulfilled", payload);
            setFormData(initialFormData);
          });
      } catch (err) {
        console.error("Failed to register: ", err);
      }
    }
  };

  if (isSuccess) {
    return (
      <>
        <div className="">
          <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>
          <p className="text-center text-teal-800 text-lg mb-10">
            Account have been successfully created, now check your emails we
            have sent a link to verify your email and activate you account, come
            back when you are done.
          </p>
        </div>
      </>
    );
  } else {
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
            Create your account
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
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="first_name" className="sr-only">
                  First name
                </label>
                <input
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  value={first_name}
                  onChange={onChange}
                  focused={focused.first_name.toString()}
                  onBlur={() => handleFocused("first_name")}
                  required
                  className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First name"
                />
                <span className="error-message ">First name is required</span>
              </div>
              <div className="mb-3">
                <label htmlFor="first_name" className="sr-only">
                  Last name
                </label>
                <input
                  name="last_name"
                  type="text"
                  autoComplete="last name"
                  value={last_name}
                  onChange={onChange}
                  focused={focused.last_name.toString()}
                  onBlur={() => handleFocused("last_name")}
                  required
                  className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last name"
                />
                <span className="error-message ">Last name is required</span>
              </div>
            </div>
            <div className="">
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
                focused={focused.email.toString()}
                onBlur={() => handleFocused("email")}
                required
                className="relative block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Invalid email"
              />
              <span className="error-message ">Email is required</span>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium sr-only" htmlFor="country">
                Country
              </label>
              <select
                className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                id="country"
                required
                name="country"
                value={country}
                onChange={onChange}
                focused={focused.country.toString()}
                onBlur={() => handleFocused("country")}
              >
                <option value="">Select a country</option>
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <span className="error-message ">Country is required</span>
            </div>
            <div className="flex flex-col space-y-3 pb-3">
              <label className="text-sm font-medium sr-only" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                required
                className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                name="gender"
                value={gender}
                onChange={onChange}
                focused={focused.gender.toString()}
                onBlur={() => handleFocused("gender")}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
              <span className="error-message ">Gender is required</span>
            </div>
            <div className="">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                focused={focused.password.toString()}
                onBlur={() => handleFocused("password")}
                required
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <span className="error-message ">Password is required</span>
            </div>

            <div className="">
              <label htmlFor="password" className="sr-only">
                Confirm password
              </label>
              <input
                id="re_password"
                name="re_password"
                type="password"
                value={re_password}
                onChange={onChange}
                focused={focused.re_password.toString()}
                onBlur={() => handleFocused("re_password")}
                required
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm password"
              />
              <span className="error-message ">
                Confirm password is required
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="newsletter"
              className="ml-2 block text-sm text-gray-900"
            >
              Subscribe to our newsletter
            </label>
          </div>
          <p className="text-xs">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>

          <div>
            {isLoading ? (
              <div className="flex justify-center my-5">
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                type="submit"
                className="group relative flex w-full justify-center border border-transparent bg-black  hover:bg-gray-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 "
              >
                Register
              </button>
            )}
            {isRegisterError && error.status === 400 && (
              <div className="bg-green-200 text-green-800 py-2 px-4 rounded-md text-center">
                An account with the same email already exist
              </div>
            )}
          </div>
        </form>
        <div className="">
          <p className="text-center">
            Already have an account?{" "}
            <span className=" text-indigo-600">
              <button onClick={handleSigninClick} >
                Sign in
              </button>
            </span>
          </p>
        </div>
      </>
    );
  }
};

export default Register;
