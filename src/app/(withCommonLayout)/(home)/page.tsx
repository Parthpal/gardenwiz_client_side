/* eslint-disable prettier/prettier */
import CreatePost from '@/src//components/UI/Post/CreatePost';
import PostCard from '@/src//components/UI/Post/PostCard';
import TextEditor from '@/src//components/UI/RichTextEditor/TextEditor';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            
            <CreatePost/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    );
};

export default HomePage;
