/* eslint-disable prettier/prettier */
'use client'
import Container from "@/src//components/Container";
import Sidebar from "@/src//components/UI/sidebar/Sidebar";
import { useUser } from "@/src//context/user.provider";
import ProfileLoading from "./Loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {user,isLoading}=useUser();
  if(isLoading){
    return <ProfileLoading/>
  }
  return (
    <Container>
        <div className="flex w-full">
        <div className="w-4/5">
            {children}
        </div>
        <div className=" w-1/5 sticky top-0 h-screen">
            <Sidebar/>
        </div>
        </div>
    </Container>
  );
}