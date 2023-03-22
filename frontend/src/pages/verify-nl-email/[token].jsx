import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Oval, ThreeDots } from "react-loader-spinner";
import { useVerifyNewsletterEmailMutation } from "@/redux/api/generalApi";
import { GrClose } from "react-icons/gr";
import Layout from "@/components/Layout";
import Articles from "@/components/SpecialArticles";
import Link from "next/link";

const Verify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query || {};

  const [verifyEmail, { isSuccess, isLoading, isError, error }] =
    useVerifyNewsletterEmailMutation();

  useEffect(() => {
    try {
      verifyEmail({ token });
    } catch (err) {
      console.error("Failed to verify email: ", err);
    }
  }, [token, verifyEmail]);

  return (
    <Layout>
      <Articles />
      <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
        <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
            <div className="flex justify-end bg">
              <button onClick={() => router.push("/")}>
                <GrClose className="text-2xl mt-2" />
              </button>
            </div>
            {isSuccess && (
              <>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  ModernMinds Newsletter
                </h2>
                <div className="pb-5 text-center">
                  <span className="text-center text-lg">
                    You&apos;ve been successfully added to our mailing list.
                    Thank you for subscribing!
                  </span>
                </div>
              </>
            )}{" "}
            {isError && (
              <>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  ModernMinds Newsletter
                </h2>
                <div className="pb-5 text-center">
                  <span className="text-center text-lg">
                    You weren&apos;t added to our list because your token is
                    invalid. Please{" "}
                    <Link href="/" className="underline">
                      subscribe again
                    </Link>{" "}
                    to generate a new token.
                  </span>
                </div>
              </>
            )}
            {isLoading && (
              <div className="flex justify-center pb-10">
                {" "}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
