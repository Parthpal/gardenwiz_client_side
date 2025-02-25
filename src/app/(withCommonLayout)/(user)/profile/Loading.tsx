/* eslint-disable prettier/prettier */
import React from 'react';

import Container from '@/src//components/Container';
import FollowCardSkeleton from '@/src//components/FollowerCardSkeleton';
import PostCardSkeleton from '@/src//components/PostCardSkeleton';
import ProfileSidebarSkeleton from '@/src//components/ProfileSidebarSkeleton';

const ProfileLoading = () => {
    return (
           <>  
               <Container>
        <div className="flex w-full">
                    <div className="lg:w-4/5 w-full mx-10">
                    <div className="col-span-2 lg:ml-8 space-y-5">
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    </div>
                    </div>
        <div className=" w-1/5 hidden lg:flex top-0 h-screen ml-8">
            <ProfileSidebarSkeleton/>
        </div>
        </div>
              </Container>  
    </> 
    );
};

export default ProfileLoading;