import React from 'react';

const PostDetails = ({ params }: { params: { postID: string } }) => {
    return (
        <div>
            <h1>Post Details</h1>
            <p>Post ID: {params.postID}</p>
        </div>
    );
};

export default PostDetails;