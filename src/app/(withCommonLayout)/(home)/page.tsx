/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import React, { useEffect, useState } from 'react';
import { VList, WindowVirtualizer } from 'virtua';

import { Ipost } from '../../../../types';

import Sideposts from './@sideposts/page';

import CreatePost from '@/src//components/UI/Post/CreatePost';
import PostCard from '@/src//components/UI/Post/PostCard';
import { UseGetPosts } from '@/src//hooks/post.hook';
import { useUser } from '@/src//context/user.provider';
import PostCardSkeleton from '@/src//components/PostCardSkeleton';
import { UseGetUsersById } from '@/src//hooks/users.hook';



const HomePage = () => {
    
    const {user}= useUser();
    const {data:CurrentuserData}=UseGetUsersById(user?._id);
        const {
            data: postData,
            isLoading: postLoading,
        } = UseGetPosts();
    //console.log(CurrentuserData?.data?.followingIds);
    const followingIdsSet = new Set(
        CurrentuserData?.data?.followingIds?.map((user: any) => user._id)
    );
    
    const filteredPosts = postData?.data?.filter((post: any) =>
        followingIdsSet.has(post.userID._id)
    );
    if (postLoading) {
        return (
          <>
            {Array(4).fill(null).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </>
        );
      }

    return (
        <div>    
            {
                user?.email ? (<>
                    <CreatePost/>
                    <div className='flex flex-col align-middle justify-center block lg:hidden mx-2'>
                    <h1 className="text-large">Who to Follow</h1>
                        <Sideposts/>
                    </div>
                    {
                       CurrentuserData?.data?.followingIds.length > 0?
                        <div>
                        <WindowVirtualizer>
                            {Array.from({ length: 1000 }).map((_, i) => (
                                <div
                                key={i}
                                style={{
                                    marginTop:'10px',
                                    // background: "white",
                                }}
                                >
                        {
                            filteredPosts?.map((posts:Ipost,index:any)=>
                                <PostCard key={index} posts={posts}/>
                            )
                        } 
                         
                         </div>
                         ))}
                         </WindowVirtualizer>
                        </div>:
                         <h1 className='text-center'>Unlock exclusive gardening tips by following fellow gardeners! 🌱👩‍🌾</h1>
                    }
                </>):
                (
                    // postData?.data?.map((posts:Ipost,index:string)=>
                    //     <PostCard key={index} posts={posts}/>
                    // )
                    <h1 className='text-center'>Unlock exclusive gardening tips by following fellow gardeners! 🌱👩‍🌾</h1>
                )
                
            }          
        </div>
    );
};

export default HomePage;
