import React, { useState } from "react";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Layout from "@/components/Layout";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleFocused = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch("/api/auth/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setFocused({
          name: false,
          email: false,
          message: false,
        });
        toast.success("Message sent successfully!", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
        setIsLoading(false);
      } else {
        toast.error("Something went wrong, Try again latter", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      toast.error("Something went wrong, Try again latter", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full sm:w-3/4 mx-5 md:mx-10 p-2 mt-20 mb-10">
          <h1 className=" text-center text-4xl text-gray-900 mt-5 font-graphikBold">
            Contact us
          </h1>
          <p className="text-center my-5 font-bold">
            We would be delighted to hear from you if anything on our site has
            caught your attention, sparked new ideas, or left you with any
            questions. Simply submit the form below.
          </p>
          <form className=" gap-y-4" onSubmit={handleSubmit}>
            <div className="form-div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="contact-input border  border-gray-500 outline-none"
                value={name}
                focused={focused.name.toString()}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => handleFocused("name")}
                placeholder="Enter your name"
                required
              />
              <span className="error-message">Name is required</span>
            </div>
            <div className="form-div">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="contact-input border border-gray-500 outline-none"
                value={email}
                focused={focused.email.toString()}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => handleFocused("email")}
                placeholder="Enter your Email address"
                required
              />
              <span className="error-message">Email invalid</span>
            </div>
            <div className="form-div">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                className="contact-input border  border-gray-500 outline-none"
                value={message}
                focused={focused.message.toString()}
                onChange={(event) => setMessage(event.target.value)}
                onBlur={() => handleFocused("message")}
                placeholder="Type your message"
                required
              />
              <span className="error-message">This field is required</span>
            </div>
            {isLoading ? (
              <button className="ml-5">
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </button>
            ) : (
              <button
                className=" py-2 px-5 mx-2 text-lg rounded-lg border border-black"
                type="submit"
              >
                <span>Sumbit</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactForm;
