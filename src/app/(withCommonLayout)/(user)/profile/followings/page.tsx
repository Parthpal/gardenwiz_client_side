/* eslint-disable react/jsx-key */
/* eslint-disable padding-line-between-statements */
'use client'
import { useUser } from "@/src//context/user.provider";
import { useDeleteFollowing, UseGetUsersById } from "@/src//hooks/users.hook";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import React from "react";

const FollowingPage = () => {
  const { user } = useUser();
  const{mutate:deleteFollowing}=useDeleteFollowing();
  const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
  console.log(CurrentuserData?.data);
  
  const handleUnfollowUser=(followingID:string)=>{
    const currentUserId=user?._id ?? '';
    deleteFollowing({followingID,currentUserId})
  }

  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
      {CurrentuserData?.data?.followingIds?.map((item: any, index) => (
        /* eslint-disable no-console */
        <div className="flex flex-col items-center align-middle space-y-2">
          <Image
            key={item._id}
            alt="following image"
            height={200}
            radius="full"
            width={200}
            src={`${item.profilePhoto}` || 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}
          />
          <p className="">{item.name}</p>
          <div className="">
          <Button onPress={()=>handleUnfollowUser(item._id)} className="" color="primary" variant="bordered">
              Unfollow
          </Button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default FollowingPage;
