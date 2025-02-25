"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserLogin } from "../hooks/auth.hook";
import { useUser } from "../context/user.provider";


const LoginRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const { isLoading: userLoading } = useUser();
  const { isPending, isSuccess } = useUserLogin();

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect || "/");
    }
  }, [isPending, isSuccess, redirect]);

  return null;
};

export default LoginRedirect;
