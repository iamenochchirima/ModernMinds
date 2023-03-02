import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "@/redux/api/authApi";
import { Oval } from "react-loader-spinner";

const EmailVeryfication = () => {
  const router = useRouter();
  const { uid, token } = router.query;
  const [verifyUser, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  useEffect(() => {
    // verifyUser({ uid, token });
  }, [uid, token, verifyUser]);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <span className="p-52 ">
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
        </span>
      </div>
    );
  } else if (!isSuccess) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="p-52" >Email verified successfully!</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <p className="p-52">There was an error verifying your email address.</p>
      </div>
    );
  } else {
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <p className="p-52">Something went wrong</p>
      </div>
  }
};

export default EmailVeryfication;
