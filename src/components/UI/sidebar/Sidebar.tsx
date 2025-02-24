/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React from 'react';
import UpdateProfile from '../Profile/UpdateProfile';
import { useUser } from '@/src//context/user.provider';
import { UseGetUsersById } from '@/src//hooks/users.hook';
import { fetchUser } from '@/src//service/Profile';
import Link from 'next/link';
import { VerifiedComponent } from '../../icons';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ProfileLoading from '@/src//app/(withCommonLayout)/(user)/profile/Loading';


type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const Sidebar = () => {
        const {user,isLoading:userLoading}=useUser();
        const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
        const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
        const [size, setSize] = React.useState<Sizes>("3xl");
        const sizes:Sizes[]=["3xl"];

        const handleOpen = (size : Sizes) => {
          setSize(size);
          onOpen();
        };
    return (
        <>
        <div className=''>
          <div className='flex lg:items-start lg:justify-start items-center justify-center'>
          <Avatar src={CurrentuserData?.data?.profilePhoto} className="w-20 h-20 text-large" />
          </div>
            <div className='space-y-4 py-5 flex flex-col items-center justify-center lg:items-start lg:justify-start'>
                <h1 className='text-2xl'>{CurrentuserData?.data?.name}</h1>
                {
                  CurrentuserData?.data?.status==='PREMIUM'?
                  <Button color="primary" variant="bordered">Verified<span><VerifiedComponent/></span></Button>:
                  <Link href='/profile/Checkout'>
                  <Button color="primary" variant="solid">Verify Account</Button>
                  </Link>
                }
                <p>Followers({currentuserload  ? '0' : `${CurrentuserData?.data?.followerIds?.length}`})</p>
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
                <h1 className='m-0'>Following({currentuserload  ? '0' : `${CurrentuserData?.data?.followingIds?.length}`})</h1>  
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
                <Button color="primary" variant="bordered" className="text-medium" key={size} onPress={() => handleOpen(size)}>
                Edit Profile
                </Button>                     
            </div>
        </div>
        <Modal isOpen={isOpen}
        onOpenChange={onOpenChange} 
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={size}

          >
            <UpdateProfile onClose={onClose}/>
         </Modal>   
        </> );
};

export default Sidebar;