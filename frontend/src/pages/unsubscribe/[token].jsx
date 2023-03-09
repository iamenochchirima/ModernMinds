import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNewsletterUnsubscribeMutation } from "@/redux/api/generalApi";

const Unsubscibe = () => {
  const router = useRouter();
  const [defaultDiv, setDefaultDiv] = useState(true);

  const { token } = router.query || {};

  const [unsubscribe, { isSuccess, isLoading, isError, error }] =
    useNewsletterUnsubscribeMutation();

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
        console.error("Failed to unsubscribe: ", err);
      }
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-dimWhite bg-opacity-75">
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
          <div className="flex flex-col space-y-5">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Mordern Minds"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              MODERNMINDS NEWSLETTER
            </h2>
            {defaultDiv && (
              <>
                <p>
                  Unsubscribe from our Newsletter please select the "Unsubscribe
                  Me" button below to unsubscribe from future updates.
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
                  You have been successfully Unsubscribed, We're sorry to see you go.
                </p>
                <button
                  onClick={handleUnsubscribe}
                  className="bg-black text-white font-semibold py-2 px-4"
                >
                  Resubscribe me?
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscibe;
