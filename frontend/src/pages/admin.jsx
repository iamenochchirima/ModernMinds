import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Articles from "@/components/SpecialArticles";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";
import { useMainNewsletterMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineWarning } from "react-icons/ai";

const Admin = () => {
  const router = useRouter();

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  const [confirm, setConfirm] = useState(false);

  const [sendmainLetter, { isSuccess, isLoading, isError, error }] =
    useMainNewsletterMutation();

  const handleMainMailSend = () => {
    setConfirm(false)
    try {
      sendmainLetter();
    } catch (err) {
      console.error("Failed to sign up for newsletter: ", err);
    }
  };

  return (
    <Layout>
      <Articles />
      <div className="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div className=" flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white w-full rounded px-6 py-2 max-w-xl space-y-8">
            <div className="flex justify-end">
              <button className="justify-end" onClick={() => router.push("/")}>
                <GrClose className="text-2xl mt-2" />
              </button>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Modern Minds Admin View
            </h2>
            <Link href={`${adminUrl}`} target="_blank">
              <div className="flex flex-col">
                <button className="hover:underline border p-3 mt-4 ">
                  Go to adminstrations Interface
                </button>
              </div>
            </Link>
            <h2 className="mt-6 text-center text-xl font-medium tracking-tight text-gray-700">
              Newsletters
            </h2>
            {confirm && (
              <div className="text-center">
              <div className="bg-red-200 p-5">
                <div className="flex items-center justify-center gap-2 text-xl">
                  <AiOutlineWarning className=" text-red-600 text-2xl" />
                  <span className="text-red-900">Warning! </span>
                </div>
                <p className="text-center mt-3">
                  You are about to send an email newsletter to all the subscribers. This action is
                  not reversable, make sure you have correctly updated and
                  finished setting up the email template you are about to send.
                </p>
              
              </div>
              <button onClick={handleMainMailSend} className="text-center bg-black px-4 py-2 mt-5 text-white text-bold">Proceed</button>
              </div>
            )}
            {!confirm && <div className="flex border-t border-b p-4 items-center border-gray-700 justify-between">
              <span>The weekly main email for all subscribers</span>
              {isLoading ? (
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                <button
                  type="submit"
                  onClick={() => setConfirm(true)}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
              )}
            </div>}
            {isSuccess && (
              <div className="bg-green-200 text-green-700 py-2 px-4 rounded-md text-center">
                Emails sent successfully!
              </div>
            )}
            {isError && (
              <div className="bg-green-200 text-red-700 py-2 px-4 rounded-md text-center">
                Emails failed to be sent
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
