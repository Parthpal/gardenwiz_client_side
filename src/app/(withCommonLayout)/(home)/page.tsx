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
import { useUser } from '@/src//context/user.provider';
import { VList, WindowVirtualizer } from 'virtua';


const HomePage = () => {
    
    const {user}= useUser();
        const {
            data: postData,
            isLoading: postLoading,
            isSuccess: postSuccess,
        } = UseGetPosts();
        
    return (
        <div>    
            {
                user?.email ? (<>
                    <CreatePost/>
                    <div>
                    <WindowVirtualizer>
                        {Array.from({ length: 1000 }).map((_, i) => (
                            <div
                            key={i}
                            style={{
                                marginTop:'10px',
                                background: "white",
                            }}
                            >
                                        {
                        postData?.data?.map((posts:Ipost,index:string)=>
                            <PostCard key={index} posts={posts}/>
                        )
                    } 
                     
                     </div>
                     ))}
                     </WindowVirtualizer>
                    </div>
                </>):
                (
                    postData?.data?.map((posts:Ipost,index:string)=>
                        <PostCard key={index} posts={posts}/>
                    )
                )

            }          
        </div>
    );
};

export default HomePage;
