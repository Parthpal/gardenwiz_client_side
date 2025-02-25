/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable prettier/prettier */
"use client"
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader } from '@nextui-org/card';
import React, { useEffect, useState } from 'react';

import { IUser } from '../../../../types';
import FollowCardSkeleton from '../../FollowerCardSkeleton';

import { addFollower,fetchUser } from '@/src//service/Profile';
import { useAddFollower, useDeleteFollowing,  } from '@/src//hooks/users.hook';
import { useUser } from '@/src//context/user.provider';

const FollowCard = ({user}:{user:IUser}) => {
    const {user:currentUser,isLoading:userLoading}=useUser();
    const {mutate:addFollower,isPending,isSuccess}=useAddFollower();
    const {mutate:deleteFollower}=useDeleteFollowing();
    const [allUserData,setAllUserData]=useState([]);
    const filterUser:IUser[]=allUserData.filter((userData:IUser)=>userData?._id===currentUser!._id)
    //console.log(filterUser[0],'follow card');
    const [isFollowed, setIsFollowed] = React.useState(filterUser[0]?.followingIds?.includes(user?._id));
    const handleFollow =(follwedCheck: boolean, id: string) => {
      // Optimistic update
      setIsFollowed(follwedCheck);
      if(follwedCheck){
        addFollower({followerID: id, currentUserId: currentUser!._id})
        // setTimeout(()=>{
        //   window.location.reload(); 
        // },1000)
      }
      else{
        deleteFollower({followingID: id, currentUserId: currentUser!._id})
      }
    };
    useEffect(()=>{
      fetchUser()
      .then((data)=>{
        //console.log(data.data);
        setAllUserData(data?.data) 
      })
      setIsFollowed(filterUser[0]?.followingIds?.includes(user?._id));
    },[currentUser,userLoading])

    if (isPending) {
      return (
        <>
          {Array(1).fill(null).map((_, index) => (
            <FollowCardSkeleton key={index} />
          ))}
        </>
      );
    }
    return (
        <>
            <Card className="lg:max-w-[340px] w-full">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={user?.profilePhoto}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
                    </div>
                    </div>
                    <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed? "bordered" : "solid"}
                    onPress={()=>handleFollow(!isFollowed,user._id)}
                    >
                    {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                </CardHeader>
            </Card>
        </>
    );
};

export default FollowCard;

