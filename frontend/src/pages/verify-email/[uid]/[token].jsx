import { useEffect } from "react";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "@/redux/api/generalApi";
import { setOpenLoginViewState } from "@/redux/slices/authSlice";
import { Oval, ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";

const EmailVeryfication = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const { uid, token } = router.query || {};
  const [verifyUser, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  const handleLoginButtonClick = () => {
    router.push('/')
    dispatch(setOpenLoginViewState())
  }
  const handleErrorButtonClick = () => {
    router.push('/')
    dispatch(setOpenLoginViewState())
  }

  useEffect(() => {
    verifyUser({uid, token});
  }, [uid, token, verifyUser]);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <span className="p-52 ">
                      <ThreeDots
                        height="60"
                        width="60"
                        radius="9"
                        color="#black"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />      
        </span>
      </div>
    );
  } else if (isSuccess) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-5 p-52">
          <span>Email verified successfully!</span>
          <button onClick={handleLoginButtonClick} className="px-4 py-2 bg-black text-white">
            Continue to login
          </button >
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-5 p-52">
          <span>There was an error verifying your email address.</span>
          <button onClick={handleErrorButtonClick} className="px-4 py-2 bg-black  text-white">
            Try to login
          </button >
        </div>
      </div>
    );
  } else {
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <p className="p-52">Something went wrong</p>
    </div>;
  }
};

export default EmailVeryfication;
