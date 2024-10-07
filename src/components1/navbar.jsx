import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Signout from "../components/Homepage/Signout.tsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { authState } = useAuth();
  const [navbarColor, setNavbarColor] = useState("bg-customWhite");
  const [textColor, setTextColor] = useState("text-customBlack");
  const [buttonTextColor, setButtonTextColor] = useState("text-customPurple");
  const [signUpButtonColor, setSignUpButtonColor] = useState(
    "bg-customPurple text-white"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setNavbarColor("bg-customPurple");
        setTextColor("text-white");
        setButtonTextColor("text-white");
        setSignUpButtonColor("bg-white text-customPurple");
      } else {
        setNavbarColor("bg-customWhite");
        setTextColor("text-customBlack");
        setButtonTextColor("text-customPurple");
        setSignUpButtonColor("bg-customPurple text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${navbarColor} py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-10 transition-colors duration-200`}
    >
      <div className={`text-3xl font-bold font-Montserrat ${textColor}`}>
        hireFAST
      </div>
      <div>
        {!authState.isAuthorized ? (
          <>
            <Link to="/signin" className={`mx-6 font-Lato ${buttonTextColor}`}>
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`px-4 py-2 rounded-full hover:drop-shadow-l font-Lato ${signUpButtonColor}`}
            >
              Sign up
            </Link>
          </>
        ) : (
          <Signout signUpButtonColor={signUpButtonColor} />
        )}
      </div>
    </nav>
  );
}
