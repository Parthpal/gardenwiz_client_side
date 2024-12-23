/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client"
import GWForm from "@/src//components/UI/Form/GWForm";
import GWInput from "@/src//components/UI/Form/GWInput";
import { useUser } from "@/src//context/user.provider";
import { useUserLogin } from "@/src//hooks/auth.hook";
import { loginUser } from "@/src//service/AuthService";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser(); 
  const redirect = searchParams.get("redirect");
  const {mutate:handleUserLogin,isPending,isSuccess}=useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleUserLogin(data)
    userLoading(true);
  };
  
 useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

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
        <div className="pb-10 md:w-[60%] w-[80%] bg-base-200 rounded-lg border-[#1d772e] border-2 lg:mx-0 mx-auto">
          <h3 className="text-3xl text-center mt-4 font-bold text-[#1d772e]">
            Login Here
          </h3>
          <div >
            <GWForm onSubmit={onSubmit}>
              <GWInput  className="my-5 px-5 " color="success" label="email" name="email" type="email" />
              <GWInput className="my-5 px-5" color="success" label="password" name="password" type="password"  />
              <Button
              className="my-4 w-[90%] mx-5 rounded-md bg-[#1d772e] font-semibold text-white"
              size="lg"
              type="submit"
            >
              Login
            </Button>
            </GWForm>
            <div className="text-center">
                 Don&apos;t have an account ? <Link className="text-[#1d772e]" href={"/register"}>Register</Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
