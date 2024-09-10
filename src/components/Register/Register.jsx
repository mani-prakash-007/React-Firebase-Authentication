import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../InputComponent/Input";
import googleIcon from "../../assets/google.png";
import facebookIcon from "../../assets/facebook.png";
import twitterIcon from "../../assets/twitter.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export const Register = () => {
  //States
  const [newUser, setNewUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  //Onchange function for update newUser State
  const handleInputFieldChange = (event) => {
    const { name, value } = event.target;
    setNewUser((currentInput) => {
      return {
        ...currentInput,
        [name]: value,
      };
    });
  };

  //Input Fields Data
  const inputFields = [
    {
      id: "fname",
      name: "fName",
      type: "text",
      label: "First Name",
      placeholder: "Enter First Name",
    },
    {
      id: "lname",
      name: "lName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter Last Name",
    },
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

  //Handle Registration
  const handleRegister = async (event) => {
    event.preventDefault();
    const loadingToastId = toast.loading("Registering...", {
      position: "top-center",
    });
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      const user = auth.currentUser;
      console.log(user.uid);
      if (user) {
        await setDoc(doc(database, "Users", user.uid), {
          firstName: newUser.fName,
          lastName: newUser.lName,
          email: user.email,
        });
      }
      console.log(user);
      console.log("User Registered Successfully");
      toast.dismiss(loadingToastId);
      toast.success("Registered Successfully !", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToastId);
      toast.error(`Registration failed. ${error.message}`, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <div className=" bg-gray-100 flex flex-col rounded-xl justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link
              to={"/login"}
              className="font-medium text-orange-600 hover:text-orange-500 ml-3"
            >
              Already have account ?
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleRegister} className="space-y-6">
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
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 active:scale-95"
                >
                  Register
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
