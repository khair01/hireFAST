import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import axios from 'axios';
const registerschema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

type FormFields = z.infer<typeof registerschema>;
export default function Signin() {
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
            console.log(res.data); // Axios puts the response body in `data`
            console.log("Registered successfully");
            // const res = await fetch("http://localhost:8000/user/login", {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         email: email,
            //         password: password
            //     }),

            // }
            // );

            // if (!res.ok) {
            //     console.log(res);
            //     console.log("Registration failed");
            // } else {
            //     const result = await res.json();
            //     console.log(result);
            //     console.log("Registered successfully");

            // }

        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            console.log("Registration failed");
        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
                <div className="bg-white border-purple-950 w-6/12 md:w-1/5 py-6 px-8 flex flex-col items-center max-w-lg border-2 border- rounded-md shadow-md">
                    <h1 className=" text-purple-800 pt-14 font-semibold text-3xl font-serif">Sign In</h1>
                    <form
                        action={'#'}
                        className="flex flex-col text-sm mt-6 w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="username" className="" >email</label>
                        <input
                            type="text" id="username"  {...register("email")} autoComplete='off'
                            className="focus:outline-none active:outline-none  bg-transparent border-b border-blue-300 mb-4"
                        />
                        {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
                        <label htmlFor="password" className="">password</label>
                        <input type="password"  {...register("password")} id="password" className="focus:outline-none  bg-transparent border-b border-blue-300" />
                        {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                        <Link to={'/signup'} className="text-xs text-gray-400 pt-1 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Dont have an account?</Link>
                        <button className="btn-primary" type="submit">{isSubmitting ? "Submitting..." : "Sign In"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}