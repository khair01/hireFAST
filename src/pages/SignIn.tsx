import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components1/navbar.jsx";

const registerschema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type FormFields = z.infer<typeof registerschema>;
export default function Signin() {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerschema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      console.log("Sign in successfully");
      // Navigate(-1);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      console.log("Registration failed");
    }
  };
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
          <div className="bg-white border-purple-950 w-full md:w-auto max-w-xs py-6 px-8 flex flex-col items-center border-2 rounded-md shadow-md mx-20 -my-20 md:my-0">
            <h1 className="text-purple-800 pt-14 font-Montserrat text-3xl font-bold">
              Sign In
            </h1>
            <form
              action={"#"}
              className="flex flex-col text-sm mt-6 w-full"
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
                className="focus:outline-none active:outline-none bg-transparent border-b border-blue-300 mb-4"
              />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
              <label htmlFor="password" className="font-Roboto">
                password
              </label>
              <input
                type="password"
                {...register("password")}
                id="password"
                className="focus:outline-none bg-transparent border-b border-blue-300"
              />
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
