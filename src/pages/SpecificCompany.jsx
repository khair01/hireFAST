import React from 'react'
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"

export default function SpecificCompany() {
    const { id } = useParams();
    return (
        <>
            <section className='flex mt-[72px] justify-between w-full '>
                <div className='flex '>
                    <div className=' ml-6'>
                        <Avatar className="w-40 h-40">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-2xl mt-14 ml-4'>Systems Limited</h1>
                        <p className='text-gray-400 ml-4'>@systemslimited</p>
                    </div>
                </div>
                <Button className="bg-customPurple mt-16 mr-8"><FaPlus />Update Profile</Button>
            </section>
            <Separator className="mt-6" />
            <section className='mt-4 ml-4'>
                <div className='border-[1px] max-w-6xl md:mx-auto rounded-md px-2 py-6 border-customPurple  '>
                    <h1 className='font-semibold md:text-center mb-2 font-Montserrat '>About Us</h1>
                    <p className="text-gray-600 break-words word-wrap text-wrap text-justify">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti totam officiis ipsum, molestiae suscipit amet modi vitae in ratione nisi.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt molestiae nobis explicabo blanditiis consectetur dicta, in reiciendis esse! Blanditiis consectetur vitae ab aut nemo! Praesentium fuga fugiat, minus expedita nesciunt, et beatae incidunt, similique doloribus ut tempora voluptatem illo sit.
                    </p>
                </div>
                <div className='mt-10'>
                    <h1 className='font-semibold font-Montserrat'>Available Jobs</h1>
                    <h6 className='text-center mt-4 font-lato'>Company has no recent Openings</h6>
                </div>
            </section>
        </>

    )
}
