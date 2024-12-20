/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import CreatePost from '@/src//components/UI/Post/CreatePost';
import PostCard from '@/src//components/UI/Post/PostCard';
import TextEditor from '@/src//components/UI/RichTextEditor/TextEditor';
import { UseGetPosts } from '@/src//hooks/post.hook';
import { fetchPost } from '@/src//service/post';
import React, { useEffect } from 'react';
import { Ipost } from '../../../../types';

const HomePage = () => {
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
        
    
    return (
        <div>           
            <CreatePost/>
            {
                postData?.data?.map((posts:Ipost,index:string)=>
                    <PostCard key={index} posts={posts}/>
                )
            }
            
        </div>
    );
};

export default HomePage;
