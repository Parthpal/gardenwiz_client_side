/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import CreatePost from '@/src//components/UI/Post/CreatePost';
import PostCard from '@/src//components/UI/Post/PostCard';
import TextEditor from '@/src//components/UI/RichTextEditor/TextEditor';
import { fetchPost } from '@/src//service/post';
import React, { useEffect } from 'react';

const HomePage = () => {
    const [postData, setPostData] = React.useState([]);

    //  let data=fetchPost();
    //  console.log(data);
    useEffect(()=>{
        fetchPost()
        .then(data=>setPostData(data))
    },[])
    //console.log(postData?.data);
    
    return (
        <div>           
            <CreatePost/>
            {
                postData?.data?.map((posts,index)=>
                    <PostCard key={index} posts={posts}/>
                )
            }
            
        </div>
    );
};

export default HomePage;
