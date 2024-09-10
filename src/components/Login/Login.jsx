import React, { useState } from "react";
import googleIcon from "../../assets/google.png";
import facebookIcon from "../../assets/facebook.png";
import twitterIcon from "../../assets/twitter.png";
import { Link } from "react-router-dom";
import { Input } from "../InputComponent/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  //States
  const [existingUser, setExistingUser] = useState({
    email: "",
    password: "",
  });

  //Onchange function for update newUser State
  const handleInputFieldChange = (event) => {
    const { name, value } = event.target;
    setExistingUser((currentInput) => {
      return {
        ...currentInput,
        [name]: value,
      };
    });
  };

  //Input Field Data
  const inputFields = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter Email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
    },
  ];

  //Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Toast Loading
    const loadingToastId = toast.loading("Logging in....", {
      position: "top-center",
    });
    try {
      await signInWithEmailAndPassword(
        auth,
        existingUser.email,
        existingUser.password
      );
      console.log("Login Success");
      toast.dismiss(loadingToastId);
      // window.location.href = "/profile";
      toast.success("Logged in Successfully..!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.dismiss(loadingToastId);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div>
      <div className=" bg-gray-100 flex flex-col justify-center rounded-xl py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link
              to={"/register"}
              className="font-medium text-orange-600 hover:text-orange-500 ml-3"
            >
              create an account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {inputFields.map((data, index) => (
                <Input
                  key={index}
                  id={data.id}
                  name={data.name}
                  label={data.label}
                  type={data.type}
                  placeholder={data.placeholder}
                  onChange={handleInputFieldChange}
                />
              ))}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-orange-600 hover:text-orange-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                  >
                    <img
                      className="h-7 w-7"
                      src={facebookIcon}
                      alt="facebook"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                  >
                    <img className="h-5 w-5" src={twitterIcon} alt="" />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                  >
                    <img className="h-5 w-5" src={googleIcon} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
