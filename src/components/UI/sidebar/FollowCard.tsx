/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable prettier/prettier */
"use client"
import { useUser } from '@/src//context/user.provider';
import { UseAddFollower, UsefetchUsers } from '@/src//hooks/users.hook';
import { addFollower, deleteFollower, fetchUser } from '@/src//service/Profile';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader } from '@nextui-org/card';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../../types';

const FollowCard = ({user}:{user:any}) => {
    const [allUserData,setAllUserData]=useState([]);
    const {user:currentUser,isLoading:userLoading}=useUser();
    const filterUser:IUser[]=allUserData.filter((userData:IUser)=>userData?._id===currentUser!._id)
    //console.log(filterUser);
    const [isFollowed, setIsFollowed] = React.useState(filterUser[0]?.followingIds?.includes(user?._id) || false);
    const handleFollow = async (follwedCheck: boolean, id: string) => {
        // Optimistic update
        setIsFollowed(follwedCheck);
        try {
          if (follwedCheck) {
            await addFollower(id, currentUser!._id);
          } else {
            await deleteFollower(id, currentUser!._id);
          }
        } catch (error) {
          // Revert update in case of error
          setIsFollowed(!follwedCheck);
          alert("Failed to update follow status. Please try again.");
        }
      };
    
      useEffect(() => {
        // Set initial state based on fetched data
        if (!userLoading && currentUser) {
          const isUserFollowed = currentUser.followingIds?.includes(user._id);
          setIsFollowed(isUserFollowed);
        }
      }, [currentUser, userLoading, user._id]);
    
    // console.log(currentUser?.followingIds);
    // currentUser?.followerIds.map(followers=>{
    //     console.log(followers);
    // })
    
    return (
        <>
            <Card className="max-w-[340px] my-2">
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

