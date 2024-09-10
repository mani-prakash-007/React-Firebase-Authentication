import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { Login } from "./components/Login/Login.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Register } from "./components/Register/Register.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { Profile } from "./components/Profile/Profile.jsx";
import { auth } from "./components/Firebase/firebase.js";

const App = () => {
  //State
  const [user, setUser] = useState();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unSubscribe();
  }, []);

  //Router Creation
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={user ? <Navigate to={"/profile"} /> : <Login />}
        />
        <Route path="home" element={<Home />} />
        <Route
          path="login"
          element={user ? <Navigate to={"/profile"} /> : <Login />}
        />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={!user ? <Navigate to={"/login"} /> : <Profile />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
