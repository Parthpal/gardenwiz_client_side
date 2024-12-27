/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Modal, useDisclosure } from '@nextui-org/modal';
import React from 'react';
import UpdateProfile from '../Profile/UpdateProfile';
import { useUser } from '@/src//context/user.provider';
import { UsefetchUsers } from '@/src//hooks/users.hook';
import { fetchUser } from '@/src//service/Profile';


type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const Sidebar = () => {
        const {user}=useUser();
        const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
        const [size, setSize] = React.useState<Sizes>("3xl");
        const sizes:Sizes[]=["3xl"];
      
        const handleOpen = (size : Sizes) => {
          setSize(size);
          onOpen();
        };
      //console.log(data?.data);
    return (
        <>
        <div className=''>
            <Avatar src={user?.profilePhoto} className="w-20 h-20 text-large" />
            <div className='space-y-5 py-5'>
                <h1>{user?.name}</h1>
                <p>Followers</p>
                <Button className="w-full flex justify-start p-0 bg-white" key={size} onPress={() => handleOpen(size)}>
                <p>Edit Profile</p>
                </Button>
            </div>
            <h1 className='py-5'>Following</h1>
            <div className='space-y-5'>
                <p>Xyz</p>
                <p>zys</p>
                <p>See all ..</p>
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