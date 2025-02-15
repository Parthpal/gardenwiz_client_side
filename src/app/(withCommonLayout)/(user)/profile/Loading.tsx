/* eslint-disable prettier/prettier */
import Container from '@/src//components/Container';
import FollowCardSkeleton from '@/src//components/FollowerCardSkeleton';
import PostCardSkeleton from '@/src//components/PostCardSkeleton';
import ProfileSidebarSkeleton from '@/src//components/ProfileSidebarSkeleton';
import React from 'react';

const ProfileLoading = () => {
    return (
           <>  
               <Container>
        <div className="flex w-full">
                    <div className="w-4/5">
                    <div className="col-span-2 lg:ml-8 space-y-5">
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    </div>
                    </div>
        <div className=" w-1/5 sticky top-0 h-screen ml-8">
            <ProfileSidebarSkeleton/>
        </div>
        </div>
              </Container>  
    </> 
    );
};

export default ProfileLoading;