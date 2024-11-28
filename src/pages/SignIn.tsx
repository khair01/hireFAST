import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from "../components1/navbar.jsx";
import { FaEye } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast.js";

const registerschema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type FormFields = z.infer<typeof registerschema>;
export default function Signin() {
  const { authState, setAuthState } = useAuth();
  const [togglePassword, settogglepassword] = useState(false)
  const { toast } = useToast();
  const Navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormFields>(
    {
      resolver: zodResolver(registerschema)
    }
  );
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );
      // console.log(res.data);
      // console.log("Sign in successfully");

      setAuthState({
        role: res.data.role,
        id: res.data.id,
        isAuthorized: true,
        loading: false
      })
      toast({
        title: "Success",
        description: "sign in successfull",
      });
      Navigate("/");

    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
      console.log("Sign in failed");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-customWhite px-10">
        <div className="flex justify-center md:justify-start mt-10 my-0">
          <h1 className="text-[60px] md:text-[80px] lg:text-[150px] font-Montserrat font-bold text-customBlack mx-10 -my-20 md:my-30">
            hire<span className="text-customPurple">FAST</span>
          </h1>
        </div>
        <div className="flex justify-center items-center w-full md:w-auto min-h-screen bg-customWhite">
          <div className="bg-white w-full md:w-auto max-w-xs py-6 px-8 flex flex-col items-center border-2 rounded-md shadow-md mx-20 -my-20 md:my-0">
            <h1 className="text-3xl font-bold text-customPurple mb-4 text-center">
              Sign In
            </h1>
            <form
              action={"#"}
              className="flex flex-col text-sm mt-6 w-full relative space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="username" className="font-Roboto">
                email
              </label>
              <input
                type="text"
                id="username"
                {...register("email")}
                autoComplete="off"
                className="focus:outline-none active:outline-none ring-1 focus:ring-purple-600 py-1 px-1"
              />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
              <label htmlFor="password" className="font-Roboto">
                password
              </label>
              <input
                type={!togglePassword ? 'password' : 'text'}
                {...register("password")}
                id="password"
                className="focus:outline-none active:outline-none ring-1 focus:ring-purple-600 py-1 px-1"
              />
              <FaEye className="absolute right-2 top-[93px] text-purple-950 cursor-pointer" onClick={() => settogglepassword(prev => !prev)} />
              {errors.password && (
                <div className="text-red-600">{errors.password.message}</div>
              )}
              <Link
                to={"/signup"}
                className="text-xs text-gray-400 pt-1 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full font-Roboto"
              >
                Dont have an account?
              </Link>
              <button
                className="btn-primary font-Lato rounded-full mt-4"
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
