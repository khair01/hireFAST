import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"
import axios from 'axios';
import { useNavigate } from "react-router";
export default function SpecificCompany() {
    const [companyData, setCompanyData] = useState({});
    const { id } = useParams();
    const idd = 'e88142f9-6224-449a-9c7f-e16aaa10de2c';
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/getonecompany/${idd}`);
                console.log("found company:", res.data);
                setCompanyData(res.data);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        }
        fetchData();
    }, [idd])

    const handleupdateClick = () => {
        navigate(`/Company/Add/${idd}`);
    }

    return (
        <>
            <section className='flex mt-[72px] justify-between w-full '>
                <div className='flex '>
                    <div className=' ml-6'>
                        <Avatar className="w-40 h-40 object-contain">
                            <AvatarImage src={`${companyData.imageurl}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-2xl mt-14 ml-4'>{companyData.company_name}</h1>
                        <p className='text-gray-400 ml-4'>numberof employees: {companyData.numberofemployees}</p>
                    </div>
                </div>
                <Button className="bg-customPurple mt-16 mr-8" onClick={handleupdateClick}><FaPlus />Update Profile</Button>
            </section>
            <Separator className="mt-6" />
            <section className='mt-4 ml-4'>
                <div className='border-[1px] md:mx-auto rounded-md px-4 py-6 bg-white  '>
                    <h1 className='font-semibold md:text-center mb-2 font-Montserrat '>About Us</h1>
                    <p className="text-gray-600 break-words word-wrap text-wrap text-justify text-sm pl-2">
                        {companyData.description}
                    </p>
                </div>
                <div className='mt-10 bg-white px-4 py-6 rounded-md'>
                    <h1 className='font-semibold font-Montserrat'>Available Jobs</h1>
                    <h6 className='text-center mt-4 font-lato'>Company has no recent Openings</h6>
                </div>
            </section>
        </>

    )
}
