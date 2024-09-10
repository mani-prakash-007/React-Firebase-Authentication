import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../Firebase/firebase";

export const Header = () => {
  //State
  const [user, setUser] = useState();

  //sideEffects
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    }, []);
  });
  return (
    <div className="flex flex-wrap justify-between items-center px-20 my-5 rounded-xl border bg-black text-white py-3">
      <div className="flex justify-center my-2 py-1 items-center">
        <h1 className="font-bold font-serif text-center text-4xl">
          WELCOME SOLDIER
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center items-center">
          {user ? (
            <>
              {" "}
              <NavLink
                to={"/home"}
                className={({ isActive }) =>
                  `mx-7 font-bold text-xl hover:text-gray-400 ${
                    isActive && "text-orange-500"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  `mx-7 font-bold text-xl hover:text-gray-400 ${
                    isActive && "text-orange-500"
                  }`
                }
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  `mx-7 font-bold text-xl hover:text-gray-400 ${
                    isActive && "text-orange-500"
                  }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `mx-7 font-bold text-xl hover:text-gray-400 ${
                    isActive && "text-orange-500"
                  }`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
