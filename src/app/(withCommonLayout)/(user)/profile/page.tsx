import PostCard from '@/src//components/UI/Post/PostCard';
import React from 'react';

const page = () => {
    return (
        <div className='mx-36 space-y-9'>
            <h1 className='text-5xl mt-5'> D paul </h1>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    );
};

export default page;