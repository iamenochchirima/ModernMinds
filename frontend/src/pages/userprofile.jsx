import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { GrClose } from "react-icons/gr";
import { useLoadUserQuery } from "@/redux/api/authApi";
import Articles from "@/components/Articles";
import {
  useUpdateUserMutation,
  useChangeEmailMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

const userprofile = () => {
  const router = useRouter();

  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  const [emailEdit, setEmailEdit] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [areYouSure, setAreYouSure] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  const { data, isSuccess, isError, error } = useLoadUserQuery();
  const [updateUser, { isSuccess: isUpdateSuccess, isLoading }] =
    useUpdateUserMutation();
  const [
    deleteAcc,
    {
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteAccountMutation();

  const handleAccountDelete = async () => {
    try {
      await deleteAcc()
        .unwrap()
        .then((payload) => {
          console.log(payload);
          setAreYouSure(false);
        });
    } catch (err) {
      console.error("Failed to delete account: ", err);
    }
    setAreYouSure(false);
  };

  const oK = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [isError])

  const [
    emailChange,
    {
      isSuccess: emailChangeSuccess,
      isError: emailChangeError,
      isLoading: emailChangeLoading,
    },
  ] = useChangeEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      setUserInfo(data);
      setFirstName(data.user.first_name);
      setLastName(data.user.last_name);
      setCountry(data.user.country);
      setGender(data.user.gender);
      setEmail(data.user.email);
      setOldEmail(data.user.email);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsEditing(false);
      setShowUpdateMessage(true);
      setTimeout(() => setShowUpdateMessage(false), 5000);
    }
  }, [isUpdateSuccess]);

  const body = {
    first_name: firstName,
    last_name: lastName,
    country: country,
    gender: gender,
  };

  const emailBody = {
    email: email,
    oldEmail,
    oldEmail,
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    if (emailBody) {
      try {
        if (oldEmail === email) {
          setEmailEdit(false);
        } else {
          emailChange(emailBody);
        }
      } catch (err) {
        console.error("Failed to change email: ", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        await updateUser(body);
      } catch (err) {
        console.error("Failed to update: ", err);
      }
    }
  };

  return (
    <Layout>
      <Articles />
      <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-50">
        <div className=" flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white w-full rounded px-6 py-2 max-w-xl space-y-8">
            <div className="flex justify-end">
              <button className="justify-end" onClick={() => router.push("/")}>
                <GrClose className="text-2xl mt-2" />
              </button>
            </div>
            {isLoading ? (
              <div className="">Loading...</div>
            ) : (
              <>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Hello {userInfo.user?.first_name}
                </h2>
                <h3 className="text-center text-xl font-medium">
                  Personal Information
                </h3>
                {showUpdateMessage && (
                  <div className="bg-green-200 text-green-800 py-2 px-4 rounded-md text-center">
                    Personal information has been updated.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-1">
                      <label
                        className="text-sm font-medium"
                        htmlFor="firstName"
                      >
                        FIRST NAME
                      </label>
                      <input
                        className="relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium" htmlFor="lastName">
                        LAST NAME
                      </label>
                      <input
                        className="relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium" htmlFor="country">
                        COUNTRY
                      </label>
                      <select
                        className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        id="country"
                        name="country"
                        required
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                      >
                        <option value="">Select a country</option>
                        {/* Render options from the countries model */}
                        {userInfo?.user?.country_choices.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium" htmlFor="gender">
                        GENDER
                      </label>
                      <select
                        id="gender"
                        required
                        className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        name="gender"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <option value="">Select a gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="text-center">
                      {isLoading ? (
                        <div className="flex justify-center mt-5">
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
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </form>
                <div className="">
                  <h3 className="text-center text-xl font-medium">
                    Email Address
                  </h3>
                  <div className="w-full">
                    <form
                      onSubmit={handleEmailChange}
                      className="flex justify-between"
                    >
                      <div className="flex flex-col space-y-1 w-3/4">
                        <label
                          className="text-sm font-medium sr-only"
                          htmlFor="lastName"
                        >
                          Email
                        </label>
                        <input
                          className="font-medium relative block w-full appearance-none rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          disabled={!emailEdit}
                        />
                      </div>
                      {emailEdit ? (
                        <>
                          {emailChangeLoading ? (
                            <Oval
                              height={30}
                              width={30}
                              color="blue"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="#4fa94d"
                              strokeWidth={4}
                              strokeWidthSecondary={4}
                            />
                          ) : (
                            <button className="w-1/4" type="submit">
                              Save new email
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="w-1/4"
                          onClick={(e) => {
                            e.preventDefault();
                            setEmailEdit(true);
                          }}
                        >
                          Change Email
                        </button>
                      )}
                    </form>
                    {emailChangeSuccess && (
                      <div className="bg-green-200 text-green-800">
                        <p>
                          Email change request successfull!. Check your email
                          sent you a link so you can verify your new email
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {!userInfo.user?.is_subscribed && (
                  <div className="flex justify-between border border-gray-300 rounded my-5 p-5 items-center">
                    <span>Become a member</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Subscribe
                    </button>
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4"
                    onClick={() => setAreYouSure(true)}
                  >
                    Delete Account
                  </button>
                </div>
                {areYouSure && (
                  <div className="flex justify-center flex-col text-center space-y-4">
                    <h3 className="font-medium text-2xl">Are you sure?</h3>
                    <p>
                      By deleting your account, you may be unable to access
                      certain ModernMinds services. This action is irreversible.
                    </p>
                    <button
                      onClick={handleAccountDelete}
                      className="bg-black hover:bg-gray-800 text-white py-2 px-4"
                    >
                      Yes I'm sure, delete my Account
                    </button>
                    <button
                      onClick={() => setAreYouSure(false)}
                      className="bg-gray-300 hover:bg-dimBlue py-2 px-4"
                    >
                      I'll keep it
                    </button>
                  </div>
                )}
                {deleteSuccess && (
                  <div className="flex justify-center flex-col text-center space-y-4">
                    <p>Your ModernMinds have been successfully deleted!</p>
                    <button
                      onClick={oK}
                      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4"
                    >
                      Okay
                    </button>
                  </div>
                )}
                {isDeleteError && (
                  <div className="flex justify-center flex-col text-center space-y-4">
                    <p>Failed to delete, try again later</p>
                  </div>
                )}
                {userInfo.user?.is_email_verified && (
                  <div>You are a staff member</div>
                )}
                {userInfo.user?.is_admin && <div>You are an admin</div>}
                {userInfo.user?.is_email_verified && (
                  <div>You are email verified</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default userprofile;
