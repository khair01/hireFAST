import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
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
    // const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //     const { email, password } = data;
    //     try {
    //         const response: any = await signIn("credentials", {
    //             email,
    //             password,
    //             redirect: false,
    //         });
    //         console.log(response);
    //         if (!response.error) {
    //             console.log("aaa")
    //             router.push("/dashboard")

    //         }
    //         if (!response.ok) {
    //             console.log("error");
    //         }

    //     } catch (e) {

    //     }
    // }
    return (
        <>
            <div className="bg-cover w-screen h-screen flex justify-center items-center text-white ">
                <div className="bg-black  w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl border-[1px] border-gray-50 ">
                    <h1 className="pt-14 font-semibold text-3xl font-serif">Sign In</h1>
                    <form
                        action={'#'}
                        className="flex flex-col text-sm mt-10 md:w-2/3"
                    // onSubmit={handleSubmit(onSubmit)}
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
                        <Link to={'/'} className="text-xs text-gray-400 pt-1 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Dont have an account?</Link>
                        <button className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2" type="submit">{isSubmitting ? "Submitting..." : "Sign In"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}