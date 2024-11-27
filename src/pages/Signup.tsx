import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle, FaGithub, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components1/navbar.jsx";
import { useToast } from "@/hooks/use-toast.js";

// Validation schema
const registerSchema = z.object({
  firstName: z
    .string()
    .min(4, "First name should be at least 4 characters long")
    .max(48, "First name should be no longer than 48 characters"),
  lastName: z
    .string()
    .min(4, "Last name should be at least 4 characters long")
    .max(40, "Last name should be no longer than 40 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z
    .string()
    .length(11, "Phone number must be exactly 11 digits"),
  password: z
    .string()
    .min(5, "Password should be at least 5 characters long")
    .max(40, "Password should be no longer than 40 characters"),
  role: z.enum(["student", "recruiter"], {
    errorMap: () => ({
      message: "Role should be either student or recruiter",
    }),
  }),
});

const formdata = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone_number", label: "Phone Number", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

type FormFields = z.infer<typeof registerSchema>;

export default function Signup() {
  const [togglePassword, setTogglePassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const res = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Registered successfully!",
      });
      navigate("/signin");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white border w-full max-w-lg p-6 rounded-lg shadow-md mt-20">
          <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Sign Up
          </h1>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formdata.map(({ name, label, type }, index) => (
              <div key={index}>
                <label htmlFor={name} className="block font-medium">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={
                      type === "password"
                        ? togglePassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    id={name}
                    {...register(name as keyof FormFields)}
                    className="w-full border rounded-md p-2 mt-1 active:outline-none focus:outline-none focus:ring ring-1 focus:ring-purple-800"
                  />
                  {type === "password" && (
                    <FaEye
                      className="absolute right-2 top-[19PX] text-gray-500 cursor-pointer"
                      onClick={() =>
                        setTogglePassword((prev) => !prev)
                      }
                    />
                  )}
                </div>
                {errors[name as keyof FormFields] && (
                  <p className="text-red-500 text-sm">
                    {errors[name as keyof FormFields]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="role" className="block font-medium">
                Role
              </label>
              <select
                id="role"
                defaultValue=""
                {...register("role")}
                className="w-full border rounded-md p-2 mt-1 focus:ring focus:ring-purple-300"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Link
              to="/signin"
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Already have an account? Sign in
            </Link>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          <button className="w-full flex items-center justify-center border rounded-md py-2 mb-2 hover:bg-gray-100">
            <FaGithub className="mr-2" />
            Continue with GitHub
          </button>

          <button className="w-full flex items-center justify-center bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}
