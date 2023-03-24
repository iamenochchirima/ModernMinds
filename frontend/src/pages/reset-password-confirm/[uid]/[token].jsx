import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConfirmResetMutation } from "@/redux/api/generalApi";
import { setOpenLoginViewState } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Oval, ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const ConfirmPasswordReset = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { uid, token } = router.query || {};
  const [open, setOpen] = useState(false);
  const [reOpen, setReOpen] = useState(false);

  const [finishReset, { isSuccess, isLoading, isError, error }] =
    useConfirmResetMutation();

  const initialFormData = Object.freeze({
    password: "",
    re_password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const { password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const body = {
    uid,
    token,
    password: formData.password,
    re_password: formData.re_password,
  };

  const handleSigninClick = () => {
    router.push("/");
    dispatch(setOpenLoginViewState());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(body);
    if (body) {
      try {
        await finishReset(body)
          .unwrap()
          .then((payload) => {
            setFormData(initialFormData);
            console.log("Reset password confirm successfull", payload);
          });
      } catch (err) {
        console.error("Failed to reset password: ", err);
      }
    }
  };

  useEffect(() => {
    if (isError && error.data.error === "Passwords do not match") {
      toast.error("Passwords do not match", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
    }
  }, [isError]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
          <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>

          {isSuccess ? (
            <div className="">
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-700">
                Passoword reset successfull!
              </h2>
              <p className="text-center mt-5 text-gray-900">
                Now you can go ahead and sign in
              </p>
              <button
                onClick={handleSigninClick}
                type="submit"
                className="mb-10 mt-5 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          ) : (
            <>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Finish password reset
              </h2>
              <form
                className="mt-8 space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div className="flex items-center mb-5 border rounded">
                    <input
                      id="password"
                      name="password"
                      type={open ? "text" : "password"}
                      value={password}
                      onChange={onChange}
                      required
                      className=" w-full  px-3 py-2 border-none text-gray-900 placeholder-gray-500 outline-none sm:text-sm"
                      placeholder="Password"
                    />
                    {open ? (
                      <AiOutlineEye
                        onClick={() => setOpen(false)}
                        className="mr-2 text-xl"
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setOpen(true)}
                        className="mr-2 text-xl"
                      />
                    )}
                  </div>
                </div>
                <div className="-space-y-px rounded-md shadow-sm">
                  <div className="flex border items-center rounded">
                    <input
                      id="re_password"
                      name="re_password"
                      type={reOpen ? "text" : "password"}
                      value={re_password}
                      onChange={onChange}
                      required
                      className="relative block w-full focus:border-none border-none px-3 py-2 text-gray-900 placeholder-gray-500 outline-none sm:text-sm"
                      placeholder="Confirm password"
                    />
                    <div className=""></div>
                    {reOpen ? (
                      <AiOutlineEye
                        onClick={() => setReOpen(false)}
                        className="mr-2 text-xl"
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setReOpen(true)}
                        className="mr-2 text-xl"
                      />
                    )}
                  </div>
                </div>

                <div>
                  {isLoading ? (
                    <div className="flex justify-center my-5">
                      <ThreeDots
                        height="40"
                        width="40"
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
                      Finish
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordReset;
