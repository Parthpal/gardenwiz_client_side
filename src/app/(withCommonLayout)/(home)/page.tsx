import PostCard from '@/src//components/UI/Post/PostCard';
import TextEditor from '@/src//components/UI/RichTextEditor/TextEditor';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <TextEditor/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    );
};

export default HomePage;
