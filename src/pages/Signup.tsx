import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";


const registerschema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})
type FormFields = z.infer<typeof registerschema>

export default function Signup({
    children,
}: {
    children?: React.ReactNode
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>(
        {
            resolver: zodResolver(registerschema)
        }
    );

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const res = await fetch("/signup/api", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });

        if (!res.ok) {
            console.log("Registration failed");
        } else {
            console.log("Registered successfully");
            // Optionally, redirect or log in the user here
        }
    }

    return (
        <>
            <div className=" w-screen h-screen flex justify-center items-center  text-white">
                <div className="bg-black w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl border-gray-50 border-[1px]">
                    <h1 className="pt-14 font-semibold text-3xl font-serif">Sign Up</h1>
                    <form action="#" className="flex flex-col text-sm mt-10 md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            className="focus:outline-none active:outline-none bg-transparent border-b border-blue-300"
                            {...register("email")}
                        />
                        {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

                        <label htmlFor="password" className="mt-4">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="focus:outline-none bg-transparent border-b border-blue-300"
                            {...register("password")}
                        />
                        {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

                        <Link to={'/SignIn'} className="text-xs pt-1 text-gray-400 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Already have an account?</Link>

                        <button
                            className="bg-zinc-900 mt-4 my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Sign Up"}
                        </button>
                        {/* <CheckoutForm /> */}
                    </form>

                    <div className="my-4 flex items-center w-full">
                        <span className="flex-grow h-px bg-gray-500 opacity-25 "></span>
                        <p className="mx-4">OR</p>
                        <span className="flex-grow h-px bg-gray-500 opacity-25"></span>
                    </div>

                    <button
                        className="flex bg-black py-2 mb-4 w-7/12 md:w-8/12 mx-auto hover:bg-zinc-800"
                        onClick={async (e) => {
                            e.preventDefault();
                        }}
                    >
                        <FaGithub className="mt-1 ml-1" />
                        <h3 className="flex-grow">Continue with GitHub</h3>
                    </button>

                    <button
                        className="flex bg-white text-black py-1 mx-auto w-7/12 md:w-8/12 hover:bg-gray-500"
                        onClick={async (e) => {
                            e.preventDefault();
                        }}
                    >
                        <FaGoogle className="mt-1 ml-1" />
                        <h3 className="flex-grow">Continue with Google</h3>
                    </button>
                </div>
            </div>
        </>
    );
}
