import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth, database } from "../Firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

export const Profile = () => {
  //State
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //Fetch current user data
  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(database, "Users", user.uid);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        setCurrentUser(docData.data());
        setIsLoading(false);
      } else {
        console.log("User Not Logged in..");
      }
    });
  };

  //Handling Logout
  const handleLogout = async () => {
    setIsLoading(true);
    await auth.signOut();
    setIsLoading(false);
    // window.location.href = "./login";
    toast.success("Logged Out Successfully..!!", {
      position: "top-right",
    });
  };
  //Side Effects
  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center p-6 w-96 min-h-56 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <h1 className="font-bold text-3xl text-center ">Profile</h1>
        {/* <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" /> */}
        {isLoading ? (
          <h1 className="text-center my-10">Loading...</h1>
        ) : (
          <>
            <div className=" text-start">
              <div className="my-2 space-y-1 py-5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  First Name :{" "}
                  <span className="font-normal">{currentUser?.firstName}</span>
                </h2>
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Last Name :{" "}
                  <span className="font-normal">{currentUser?.lastName}</span>
                </h2>
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Email :{" "}
                  <span className="font-normal">{currentUser?.email}</span>
                </h2>
              </div>
              <div className="flex justify-center items-center ">
                <button
                  onClick={handleLogout}
                  className="border py-1 px-3 rounded-xl my-2 hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
