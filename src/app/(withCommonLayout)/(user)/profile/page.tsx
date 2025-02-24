/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import PostCard from '@/src//components/UI/Post/PostCard';
import { UseGetPosts } from '@/src//hooks/post.hook';
import { fetchPost } from '@/src//service/post';
import React, { useEffect, useState } from 'react';
import { Ipost, IUser } from '../../../../../types';
import { useUser } from '@/src//context/user.provider';
import CreatePost from '@/src//components/UI/Post/CreatePost';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UsefetchUsers, UseGetUsersById } from '@/src//hooks/users.hook';
import ProfileSidebarSkeleton from '@/src//components/ProfileSidebarSkeleton';
import PostCardSkeleton from '@/src//components/PostCardSkeleton';
import classNames from "classnames";
import Sidebar from '@/src//components/UI/sidebar/Sidebar';

const ProfilePage = () => {
    const {user,isLoading:userLoading}=useUser();
    const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
      //   const { data:userdata} = UsefetchUsers();
      //   //const [cUser,setcUser]=useState<IUser>([])
      //  // console.log(userdata?.data);
      //   const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
      //   useEffect(()=>{
      //     const CurrentUser:IUser[]=user?userdata?.data?.filter((userData:IUser)=>userData?._id===user._id):[];
      //     setFilteredUserData(CurrentUser ?? [])
      //   },[user,userLoading])
      //   //console.log(filteredUserData,'userfavpostid');
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
    const filtered_postData=postData?.data.filter((data:any)=>data?.userID?._id === user?._id) || []
    const filtered_Favourite_posts=postData?.data.filter((data:Ipost)=>CurrentuserData?.data?.favoritePosts?.includes(data?._id))
    //console.log(filtered_Favourite_posts,'favpost');
    if(postLoading){
      return <PostCardSkeleton/>
    }
    return (
      <>   
      <div className='lg:mx-32 mx-0 space-y-10'>
        <Tabs id="controlled-tabs">
        <TabList>
          <Tab>Home</Tab>
          <Tab>Favorites</Tab>
          <Tab className="lg:hidden inline cursor-pointer focus:border-2 focus:outline-black rounded-md p-2 border-black">
            Settings
          </Tab>
        </TabList>
        <TabPanel>
            <h1 className='text-5xl mt-5'> {CurrentuserData?.data?.name}</h1>
            <CreatePost/>
            {
                filtered_postData?.map((posts:Ipost,index:string)=>
                   <PostCard key={index} posts={posts}/>
              )
            }
        </TabPanel>
        <TabPanel>
        {
                filtered_Favourite_posts?.map((posts:Ipost,index:string)=>
                   <PostCard key={index} posts={posts}/>
              )
            }
        </TabPanel>
        <TabPanel>
          <div className='flex items-center justify-center lg:hidden '>
          <Sidebar/>
          </div>

        </TabPanel>
      </Tabs>
      </div>
      </> 
    );
};

export default ProfilePage ;