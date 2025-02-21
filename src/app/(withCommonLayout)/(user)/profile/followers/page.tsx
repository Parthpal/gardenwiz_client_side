/* eslint-disable react/jsx-key */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { useUser } from '@/src//context/user.provider';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import React from 'react';

const FollowersPage = () => {
    const{user}=useUser();
    return (
<div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
      {user?.followerIds?.map((item:any, index) => (
        /* eslint-disable no-console */
        <div className='mx-auto'>
            <Image
            key={item._id}
            alt="NextUI hero Image with delay"
            height={200}
            radius='full'
            width={200}
            src={`${item.profilePhoto}` || 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}    
             />
            <p className='text-center'>{item.name}</p>
        </div>
      ))}
    </div>
    );
};

export default FollowersPage;