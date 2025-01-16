/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Modal, useDisclosure } from '@nextui-org/modal';
import React from 'react';
import UpdateProfile from '../Profile/UpdateProfile';
import { useUser } from '@/src//context/user.provider';
import { UsefetchUsers } from '@/src//hooks/users.hook';
import { fetchUser } from '@/src//service/Profile';
import Link from 'next/link';


type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const Sidebar = () => {
        const {user,isLoading:userLoading}=useUser();
        const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
        const [size, setSize] = React.useState<Sizes>("3xl");
        const sizes:Sizes[]=["3xl"];
      
        const handleOpen = (size : Sizes) => {
          setSize(size);
          onOpen();
        };
      //console.log(data?.data);
      // console.log(user?.followingIds?.name);
      
    return (
        <>
        <div className=''>
            <Avatar src={user?.profilePhoto} className="w-20 h-20 text-large" />
            <div className='space-y-5 py-5'>
                <h1>{user?.name}</h1>
                <Link href='/profile/Checkout'>
                <Button color="primary" variant="solid">Verify Account</Button>
                </Link>
                <p>Followers({userLoading ? '0' : `${user?.followerIds?.length}`})</p>
                <Link href='/profile/followers'>
                <AvatarGroup
                    isBordered
                    max={2}
                    renderCount={(count) => (
                      <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
                    )}
                    total={user?.followerIds?.length}
                  >
                  {
                    user?.followerIds?.map((follower:any)=>(
                      <Avatar key={follower?._id} src={follower?.profilePhoto} />
                    ))
                  }
                </AvatarGroup>
                </Link>
                <Button className="w-full flex justify-start my-2 p-0 bg-white" key={size} onPress={() => handleOpen(size)}>
                <p>Edit Profile</p>
                </Button>
            </div>
            <h1 className=''>Following({userLoading ? '0' : `${user?.followingIds?.length}`})</h1>
            <div>     
            <Link href='/profile/followings'>                         
            <AvatarGroup
                    isBordered
                    max={2}
                    renderCount={(count) => (
                      <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
                    )}
                    total={user?.followingIds?.length}
                  >
                  {
                    user?.followingIds?.map((followings:any)=>(
                      <Avatar key={followings?._id} src={followings?.profilePhoto} />
                    ))
                  }
            </AvatarGroup>
            </Link>
            </div>

        </div>
        <Modal isOpen={isOpen}
        onOpenChange={onOpenChange} 
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={size}
          >
            <UpdateProfile/>
         </Modal>   
        </> );
};

export default Sidebar;