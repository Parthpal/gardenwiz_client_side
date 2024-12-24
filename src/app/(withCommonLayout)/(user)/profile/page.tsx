/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import PostCard from '@/src//components/UI/Post/PostCard';
import { UseGetPosts } from '@/src//hooks/post.hook';
import { fetchPost } from '@/src//service/post';
import React, { useEffect } from 'react';
import { Ipost } from '../../../../../types';
import { useUser } from '@/src//context/user.provider';
import CreatePost from '@/src//components/UI/Post/CreatePost';

const ProfilePage = () => {
    const {user}=useUser();
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
    const filtered_postData=postData?.data.filter((data:Ipost)=>data?.userID === user?._id)     
    return (
        <div className='mx-32 space-y-9'>
            <h1 className='text-5xl mt-5'> {user?.name}</h1>
            <CreatePost/>
            {
                filtered_postData?.map((posts:Ipost,index:string)=>
                    <PostCard key={index} posts={posts}/>
                )
            }
            
        </div>
    );
};

export default ProfilePage ;