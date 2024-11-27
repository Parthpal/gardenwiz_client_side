/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client"
import GWForm from "@/src//components/UI/Form/GWForm";
import GWInput from "@/src//components/UI/Form/GWInput";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from 'react-hook-form';

const RegisterPage = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
      };
    return (
        <div className="flex flex-col lg:flex-row ">
        <div className="flex-1 lg:ml-48 md:mx-auto">
          <Image
          width={600}
          height={400}
          src="https://res.cloudinary.com/dfelm3bvn/image/upload/v1732736587/Mobile_login-rafiki_bhznrz.png"
           alt="login"
          />
        </div>
        <div className="flex-1 mt-16 mb-16">
          <div className="pb-10 md:w-[380px] w-[350px] bg-base-200 rounded-lg border-[#1d772e] border-2 lg:mx-0 mx-auto">
            <h3 className="text-3xl text-center mt-4 font-bold text-[#1d772e]">
              Register
            </h3>
            <div >
              <GWForm onSubmit={onSubmit}>
                <GWInput className="my-5 px-5 " color="success" label="Name" name="name" type="text" />
                <GWInput className="my-5 px-5 " color="success" label="email" name="email" type="email" />
                <GWInput className="my-5 px-5" color="success" label="password" name="password" type="password"  />
                <Button
                className="my-4 lg:mx-6 mx-5 md:w-[330px] w-[310px] rounded-md bg-[#1d772e] font-semibold text-white"
                size="lg"
                type="submit"
              >
                Register
              </Button>
              </GWForm>
              <div className="text-center">
                 Already have an account ? <Link className="text-[#1d772e]" href={"/login"}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;