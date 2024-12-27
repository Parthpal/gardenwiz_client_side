/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import FollowCard from '@/src//components/UI/sidebar/FollowCard';
import { UsefetchUsers } from '@/src//hooks/users.hook';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../../../types';
import { fetchUser } from '@/src//service/Profile';
import { useUser } from '@/src//context/user.provider';
import { log } from 'console';

const Sideposts = () => {
     const{user,isLoading}=useUser();
    const [userData,setUserData]= useState<IUser[]>([])
    const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
    useEffect(()=>{
        const getUser=async()=>{
        const {data}=await fetchUser();   
        setUserData(data)
        const filteredData = data?.filter((userData: IUser) => userData._id !== user!._id) || [];
        setFilteredUserData(filteredData);
        }
        getUser()
    },[])
    return (
         <div className='top-0 sticky'>
            {
              filteredUserData?.map((user:IUser)=>(
              <FollowCard key={user?._id} user={user}/>
             ))
            }
         </div>
    );
};

export default Sideposts;