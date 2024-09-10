import React, { useEffect, useState } from "react";
import { auth, database } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Home = () => {
  //State
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //User Data Fetch
  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(database, "Users", user.uid);
      const docData = await getDoc(docRef);
      console.log(docData.data());
      if (docData.exists()) {
        setCurrentUser(docData.data());
      } else {
        console.log("User Not Logged in...");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  console.log(currentUser);
  return (
    <div className="text-center my-10">
      {currentUser ? (
        <h1>
          Welcome {`${currentUser?.firstName} ${currentUser?.lastName}...!!!`}
        </h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
