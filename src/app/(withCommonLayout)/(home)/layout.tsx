/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import FollowCard from "@/src//components/UI/sidebar/FollowCard";
import { UsefetchUsers } from "@/src//hooks/users.hook";
import { fetchUser } from "@/src//service/Profile";
import { ReactNode, useEffect } from "react";
import { IUser } from "../../../../types";
import { useUser } from "@/src//context/user.provider";
import HomePageContent from "@/src//components/HomePageContent";
import Loading from "./Loading";
import PostCardSkeleton from "@/src//components/PostCardSkeleton";
import { useRouter } from "next/navigation";

  export default function Layout({
      children,
      sideposts
      }: {
      children: ReactNode;
      sideposts: ReactNode;
  }) 
      {
      const {user,isLoading}=useUser();
      const router = useRouter();
      useEffect(() => {
        if (user?.role === 'ADMIN') {
          router.push('/admin'); // Redirect admin to the dashboard
        }
      }, [user, router]);
      if(isLoading){
        return <Loading/>
      }
      return user?.email && user?.role==='USER'?(
            <>     
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2 lg:ml-8">
                  {children}
                </div>
                <div className="ml-8">
                  <h1 className="text-large">Who to Follow</h1>
                  {sideposts}
                </div>
              </div>
            </div>
            </>):(
                   <HomePageContent/>
                 )

      ;
      }