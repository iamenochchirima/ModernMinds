import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Articles from "@/components/SpecialArticles";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";
import { useMainNewsletterMutation } from "@/redux/api/authApi";
import Link from "next/link";

const admin = () => {
  const router = useRouter();

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [sendmainLetter, { isSuccess, isLoading, isError, error }] =
    useMainNewsletterMutation();

  const handleMainMailSend = () => {
    try {
      setIsButtonDisabled(true);
      sendmainLetter();
    } catch (err) {
      console.error("Failed to sign up for newsletter: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 120000);
    }
  }, [isSuccess]);

  return (
    <Layout>
      <Articles />
      <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
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
            <Link href={`${adminUrl}`}>
              <div className="flex flex-col">
                <button className="hover:underline bg-gray-400 p-3 text-xl">
                  Go to adminstrations Interface
                </button>
              </div>
            </Link>
            <h2 className="mt-6 text-center text-xl font-medium tracking-tight text-gray-700">
              Newsletters
            </h2>
            <div className="flex border-t border-b p-4 items-center border-gray-700 justify-between">
              <span>The weekly main email for all subscribers</span>
              <button
                type="submit"
                onClick={handleMainMailSend}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                disabled={isButtonDisabled}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
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

export default admin;
