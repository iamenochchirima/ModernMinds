import {useState } from "react";
import { useRouter } from "next/router";
import { useNewsletterUnsubscribeMutation } from "@/redux/api/generalApi";
import Image from "next/image";
import { toast } from "react-toastify";

const Unsubscibe = () => {
  const router = useRouter();
  const [defaultDiv, setDefaultDiv] = useState(true);

  const { token } = router.query || {};

  const [unsubscribe, { isSuccess, isLoading, isError, error }] =
    useNewsletterUnsubscribeMutation();

    if(isError) {
      console.log(error)
    }

  const handleUnsubscribe = async () => {
    if (token) {
      try {
        await unsubscribe(token)
          .unwrap()
          .then((payload) => {
            console.log(payload);
            setDefaultDiv(false);
          });
      } catch (err) {
        console.log(err)
        if (err.status === 400) {
          toast.error('Invalid token', {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: true,
            });
        }
      }
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-dimWhite bg-opacity-75">
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
          <div className="flex flex-col space-y-5">
          <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              MODERNMINDS NEWSLETTER
            </h2>
            {defaultDiv && (
              <>
                <p>
                  Unsubscribe from our Newsletter please select the &quot;Unsubscribe
                  Me&quot; button below to unsubscribe from future updates.
                </p>
                <button
                  onClick={handleUnsubscribe}
                  className="bg-black text-white font-semibold py-2 px-4"
                >
                  Unsubscribe me
                </button>
              </>
            )}
            {isSuccess && (
              <>
                <p>
                  You have been successfully Unsubscribed, We&apos;re sorry to see you go.
                </p>
              </>
            )}
            {error?.data.detail === "Not found." && (
              <div className="bg-green-200 text-green-800 py-2 px-4 rounded-md text-center">
                <p>
                  You are already unsubscribed from the newsletter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscibe;
