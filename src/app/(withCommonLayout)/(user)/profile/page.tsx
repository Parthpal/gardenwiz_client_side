/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import PostCard from '@/src//components/UI/Post/PostCard';
import { UseGetPosts } from '@/src//hooks/post.hook';
import { fetchPost } from '@/src//service/post';
import React, { useEffect } from 'react';
import { Ipost } from '../../../../../types';

const ProfilePage = () => {
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
        
    return (
        <div className='mx-36 space-y-9'>
            <h1 className='text-5xl mt-5'> D paul </h1>
            {
                postData?.data?.map((posts:Ipost,index:string)=>
                    <PostCard key={index} posts={posts}/>
                )
            }
            
        </div>
    );
};

export default ProfilePage ;