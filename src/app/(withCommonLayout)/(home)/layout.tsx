/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import FollowCard from "@/src//components/UI/sidebar/FollowCard";
import { UsefetchUsers } from "@/src//hooks/users.hook";
import { fetchUser } from "@/src//service/Profile";
import { ReactNode } from "react";
import { IUser } from "../../../../types";

export default function layout({
  children,
  sideposts
}: {
  children: ReactNode;
  sideposts: ReactNode;
}) {
  return (
    <>
      {/* <div className="flex justify-center">
        {children}
      </div>
      <div className="flex justify-c">
        {children}
      </div> */}
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
    </>
  );
}