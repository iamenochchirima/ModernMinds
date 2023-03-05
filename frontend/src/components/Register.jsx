import { useEffect, useState } from "react";
import { useRegisterMutation, useGetCountriesQuery } from "@/redux/api/generalApi";
import { Oval } from "react-loader-spinner";
import {
  setCloseRegisterViewState,
  setOpenLoginViewState,
} from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const Register = () => {
  const [countries, setCounties] = useState(null)
  const dispatch = useDispatch();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { data, isSuccess: countriesSuccess, isError } = useGetCountriesQuery()

  useEffect(() => {
    if (countriesSuccess) {
      setCounties(data)
    }
  }, [data, countriesSuccess])

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
    console.log(body);
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
          <img
            className="mx-auto h-12 w-auto mb-5"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Mordern Minds"
          />
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
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Mordern Minds"
          />
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
              <div>
                <label htmlFor="first_name" className="sr-only">
                  First name
                </label>
                <input
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  value={first_name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="first_name" className="sr-only">
                  Last name
                </label>
                <input
                  name="last_name"
                  type="text"
                  autoComplete="last name"
                  value={last_name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last name"
                />
              </div>
            </div>
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
              >
                <option value="">Select a country</option>
                {/* Render options from the countries model */}
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
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
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
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
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm password
              </label>
              <input
                id="re_password"
                name="re_password"
                type="password"
                value={re_password}
                onChange={onChange}
                required
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm password"
              />
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
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <div className="">
          <p className="text-center">
            Already have an account?{" "}
            <span className=" text-indigo-600">
              <Link onClick={handleSigninClick} href="">
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </>
    );
  }
};

export default Register;
