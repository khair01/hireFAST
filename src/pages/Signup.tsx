import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

// firstName, lastName, email, phone_number, password, role

const registerSchema = z.object({
    firstName: z.string().min(4, "First name should be at least 4 characters long").max(48, "First name should be no longer than 48 characters"),
    lastName: z.string().min(4, "Last name should be at least 4 characters long").max(40, "Last name should be no longer than 40 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().length(11, "Phone number must be exactly 11 digits"),
    password: z.string().min(5, "Password should be at least 5 characters long").max(40, "Password should be no longer than 40 characters"),
    role: z.enum(["student", "recruiter"], {
        errorMap: (issue, ctx) => ({ message: 'role should be either student or recruiter' })
    })
});


const formdata = [{
    name: "firstName",
    type: 'text'
},
{
    name: "lastName",
    type: 'text'
},
{
    name: "email",
    type: 'text'
},
{
    name: "phone_number",
    type: 'text'
},
{
    name: "password",
    type: 'password',
},
]
type FormFields = z.infer<typeof registerSchema>

export default function Signup({
    children,
}: {
    children?: React.ReactNode
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>(
        {
            resolver: zodResolver(registerSchema)
        }
    );

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const res = await fetch("http://localhost:8000/user/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone_number: data.phone_number,
                password: data.password,
                role: data.role

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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white border-purple-950 w-11/12 md:w-2/5 py-6 px-8 flex flex-col items-center max-w-lg border-2 border- rounded-md shadow-md">
                    <h1 className="pt-8 font-semibold text-3xl font-serif text-purple-800">Sign Up</h1>
                    <form action="#" className="flex flex-col text-sm mt-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                        {formdata.map((element, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <label htmlFor={element.name} className=" mt-1">{element.name.toLowerCase()}</label>
                                    <input
                                        type={element.type}
                                        id={element.name}
                                        autoComplete="off"
                                        className="focus:outline-none bg-transparent border-b border-purple-600"
                                        {...register(element.name as keyof FormFields)}
                                    />
                                    {errors[element.name as keyof FormFields] && (
                                        <div className='text-red-600'>
                                            {errors[element.name as keyof FormFields]?.message}
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        <label htmlFor="role" className="mt-2">Choose a Role</label>

                        <select id="role" className="border-[1px] border-purple-950 active:outline-none "
                            defaultValue=''
                            {...register("role")}

                        >
                            <option value="" disabled>Select Option</option>
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>

                        </select>

                        <Link to={'/SignIn'} className="text-xs pt-1 text-gray-400 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Already have an account?</Link>

                        <button
                            className="btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="my-4 flex items-center w-full">
                        <span className="flex-grow h-px bg-gray-500 opacity-25"></span>
                        <p className="mx-4">OR</p>
                        <span className="flex-grow h-px bg-gray-500 opacity-25"></span>
                    </div>

                    <button
                        className="flex bg-white border-[1px] border-black py-2 mb-4 w-7/12 md:w-8/12 mx-auto hover:bg-zinc-800"
                        onClick={async (e) => {
                            e.preventDefault();
                        }}
                    >
                        <FaGithub className="mt-1 ml-1" />
                        <h3 className="flex-grow">Continue with GitHub</h3>
                    </button>

                    <button
                        className="flex bg-blue-500 text-black py-2 mx-auto w-7/12 md:w-8/12 hover:bg-gray-500"
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
