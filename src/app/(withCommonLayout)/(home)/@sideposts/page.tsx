/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import FollowCard from '@/src//components/UI/sidebar/FollowCard';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../../../../types';
import { fetchUser } from '@/src//service/Profile';
import { useUser } from '@/src//context/user.provider';
import { UsefetchUsers } from '@/src//hooks/users.hook';

const Sideposts = () => {
    const{user,isLoading:userLoading}=useUser();
    const [allUserData,setAllUserData]=useState([]);
   // const CurrentUser:IUser[]=allUserData.filter((userData:IUser)=>userData?._id===user!._id)
    //const [userData,setUserData]= useState<IUser[]>([])
    //console.log('userloading',userLoading);

    
    const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
        useEffect(()=>{
            const getUser=async()=>{
            const {data}=await fetchUser();        
            const CurrentUser:IUser[]=user?data.filter((userData:IUser)=>userData?._id===user._id):[];
            if(!userLoading && user){
                const filteredData = await data?.filter((userData: IUser) => userData._id !== CurrentUser[0]?._id);
                const filteredData2 = await filteredData?.filter((userData: IUser) =>!(CurrentUser[0]?.followingIds?.includes(userData?._id)));
                //console.log(filteredData2)
                // const filteredData2 = await filteredData?.filter((userData: IUser) =>(user?.followingIds?.includes(userData?._id)));
               setFilteredUserData(filteredData2);
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