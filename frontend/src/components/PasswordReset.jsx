import { useState } from "react";
import { setClosePasswordReset } from "@/redux/slices/authSlice";
import { useResetPasswordMutation } from "@/redux/api/generalApi";
import { useDispatch } from "react-redux";
import { Oval, ThreeDots } from "react-loader-spinner";
import Image from "next/image";

const PasswordReset = () => {
  const dispatch = useDispatch;

  const initialFormData = Object.freeze({
    email: "",
  });

  const [reset, { isSuccess, isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState(initialFormData);

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    email: formData.email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        await reset(body)
          .unwrap()
          .then((payload) => {
            setFormData(initialFormData);
          });
      } catch (err) {
        console.error("Failed to request password reset: ", err);
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
            Your request for password reset have been successfull, please check
            your email and use the link we sent to finish your password reseting
            process.
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
          <h3 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Request password reset
          </h3>
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
                  className="mb-10 group relative flex w-full justify-center border border-transparent bg-black hover:bg-gray-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </form>
      </>
    );
  }
};

export default PasswordReset;
