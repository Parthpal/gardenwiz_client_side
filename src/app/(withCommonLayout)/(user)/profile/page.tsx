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
import { UsefetchUsers } from '@/src//hooks/users.hook';

const ProfilePage = () => {
    const {user,isLoading:userLoading}=useUser();
        const { data:userdata} = UsefetchUsers();
        //const [cUser,setcUser]=useState<IUser>([])
       // console.log(userdata?.data);
        const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
        useEffect(()=>{
          const CurrentUser:IUser[]=user?userdata?.data?.filter((userData:IUser)=>userData?._id===user._id):[];
          setFilteredUserData(CurrentUser ?? [])
        },[user,userLoading])
        //console.log(filteredUserData,'userfavpostid');
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
    const filtered_postData=postData?.data.filter((data:Ipost)=>data?.userID === user?._id) 
   
    
     const filtered_Favourite_posts=postData?.data.filter((data:Ipost)=>filteredUserData[0]?.favoritePosts?.includes(data?._id))
    //console.log(filtered_Favourite_posts,'favpost');
    
    return (
        // 
        //     <h1 className='text-5xl mt-5'> {user?.name}</h1>
        //     <CreatePost/>
        //     {
        //         filtered_postData?.map((posts:Ipost,index:string)=>
        //             <PostCard key={index} posts={posts}/>
        //         )
        //     }
            
        // </div>
        <>
        <div className='mx-32 space-y-10'>
        <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Favorites</Tab>
        </TabList>
        <TabPanel>
            <h1 className='text-5xl mt-5'> {user?.name}</h1>
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
      </Tabs>
      </div>
      </>
    );
};

export default ProfilePage ;