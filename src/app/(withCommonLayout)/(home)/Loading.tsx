/* eslint-disable prettier/prettier */
import React from 'react';

import FollowCardSkeleton from '@/src//components/FollowerCardSkeleton';
import PostCardSkeleton from '@/src//components/PostCardSkeleton';

const Loading = () => {
    return (
           <>     
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2 lg:ml-8 space-y-5">
                <PostCardSkeleton/>
                <PostCardSkeleton/>
                <PostCardSkeleton/>
                <PostCardSkeleton/>
                </div>
                <div className="ml-8 space-y-5">
                  <h1 className="text-large ">Who to Follow</h1>
                  <FollowCardSkeleton/>
                  <FollowCardSkeleton/>
                  <FollowCardSkeleton/>
                  <FollowCardSkeleton/>
                </div>
              </div>
            </div>
            </>
    );
};

export default Loading;