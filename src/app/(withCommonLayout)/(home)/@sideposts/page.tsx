/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import FollowCard from '@/src//components/UI/sidebar/FollowCard';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../../../types';
import { fetchUser } from '@/src//service/Profile';
import { useUser } from '@/src//context/user.provider';

const Sideposts = () => {
    const{user,isLoading:userLoading}=useUser();
    //const [userData,setUserData]= useState<IUser[]>([])
    //console.log('userloading',userLoading);
    
    const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
        useEffect(()=>{
            const getUser=async()=>{
            const {data}=await fetchUser();   
            if(!userLoading && user){
                const filteredData = await data?.filter((userData: IUser) => userData._id !== user!._id);
                setFilteredUserData(filteredData);
            }
            }
            getUser()
        },[user,userLoading])
    return (<>
        {
            user?._id ? <div className='top-0 sticky'>
            {
            filteredUserData?.map((user:IUser)=>(
            <FollowCard key={user?._id} user={user}/>
            ))
            }
       </div>:
       <> </>
        }
        </>);
};

export default Sideposts;