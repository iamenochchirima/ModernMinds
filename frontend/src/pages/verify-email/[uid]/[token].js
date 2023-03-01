import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "@/redux/api/authApi";

const EmailVeryfication = () => {
  const router = useRouter();
  const { uid, token } = router.query;
  const [verifyUser, { isLoading, isSuccess, isError, error }] =
  useVerifyEmailMutation();

useEffect(() => {
  verifyUser({ uid, token });
}, [uid, token, verifyUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isSuccess) {
    return <p>Email verified successfully!</p>;
  } else if (isError) {
    return (
      <div className="">
        <p>There was an error verifying your email address.</p>
        <p>{error}</p>
      </div>
    );
  } else {
    <p>Sometthing went wrong</p>;
  }
};

export default EmailVeryfication;
