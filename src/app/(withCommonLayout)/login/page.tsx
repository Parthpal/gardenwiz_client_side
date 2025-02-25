/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client"
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Suspense } from "react";

import { forgetPassword, loginUser } from "@/src//service/AuthService";
import { useForgetPassword, useUserLogin } from "@/src//hooks/auth.hook";
import { useUser } from "@/src//context/user.provider";
import GWInput from "@/src//components/UI/Form/GWInput";
import GWForm from "@/src//components/UI/Form/GWForm";
import ProfileLoading from "../(user)/profile/Loading";
import LoadingLogin from "./Loading";
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const LoginPage = () => {
   const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser(); 
  
  const {mutate:handleUserLogin,isPending,isSuccess}=useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
   // console.log(data);
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
  //modal related
  const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
  const{mutate:forgetPasswordMutate,isPending:forgotPassIsPending,isSuccess:forgotPassIsSuccess}=useForgetPassword();
  const [size, setSize] = React.useState<Sizes>("3xl");
  const sizes:Sizes[]=["3xl"];

  const handleOpen = (size : Sizes) => {
    setSize(size);
    onOpen();
  };

  const handleForgetPass=(e:any)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //console.log(data);
    forgetPasswordMutate(data);
    setTimeout(() => {
            onClose();
          }, 2000)
  }
  return (
  <>
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
              aria-label="Login Button"
            >
              Login
            </Button>
            </GWForm>
            <div className="text-center">
                 Don&apos;t have an account ? <Link className="text-[#1d772e]" href={"/register"}>Register</Link>
            </div>
            <div className="text-center">
                 <Button   aria-label="Forgot Password Button" key={size} onPress={() => handleOpen(size)} className='p-0 m-0 border-0 bg-white'color="primary"  variant="faded">
                    Forget your Password?
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen}
          onOpenChange={onOpenChange} 
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          size={size}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Enter Registered Email</ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                          <form onSubmit={handleForgetPass} className="space-y-5">
                            <Input className="my-5 px-5 " color="primary" label="email" name="email" type="email"/>
                            <Button aria-label="Reset Password Button"  color="primary" className='w-full my-2' size="lg" type="submit">
                              Request Reset Link
                            </Button>
                          </form>
                      </CardBody>
                    </Card>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
  </>);
};

export default LoginPage;
