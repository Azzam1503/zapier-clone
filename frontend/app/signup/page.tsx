"use client"
import { Appbar } from "@/components/Appbar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import Input from "@/components/Input";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export default () => {
    const [detail, setDetails] = useState({
            name: "",
            email: "",
            password: "" 
        }
    );
console.log(detail)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDetails((prev) => ({...prev, [name]: value}));
    }
    return (
        <div>
            <Appbar />
        <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
            <div className="flex-1 pt-20 px-4"> 
                <div  className="font-semibold text-2xl pb-4">Join millions worldwide who automate their work using Zapier</div>
                    <div className="pb-4">
                        <CheckFeature title="Easy setup, no coding required" />
                    </div>
                    <div className="pb-4">
                        <CheckFeature title="Free forever for core features" />
                    </div>
                    <div className="pb-4">
                        <CheckFeature title="14-day trial of premium features & apps" />
                    </div>
        </div>
            <div className="flex-1 pb-6 pt-6 mt-12 px-4 border">
                <Input label="name" name="name" placeholder="name" onChange={handleChange} />
                <Input label="email" name="email" placeholder="email" onChange={handleChange} />
                <Input label="password" name="password" placeholder="passowrd" type="password" onChange={handleChange} />
                <br />
                <PrimaryButton size="big" onClick={async () => {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/sign-up`,{
                        name: detail.name, 
                        email: detail.email, 
                        password: detail.password
                    });
                    console.log(res)
                }}>Sign up</PrimaryButton>
            </div>
        </div>
        </div>
        </div>
    )
}