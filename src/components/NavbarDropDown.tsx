/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';

import { useUser } from '../context/user.provider';
import { logout } from '../service/AuthService';
import { protectedRoutes } from '../constant';
import { UseGetUsersById } from '../hooks/users.hook';


const NavbarDropDown = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setIsLoading: userLoading } = useUser();
    const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
    const handleLogout = () => {
        logout();
        userLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
          router.push("/");
        }
      };
      // const handleNavigation = (pathname: string) => {
      //   router.push(pathname);
      //   window.location.reload(); 
      // };
    return (
        <>
          <Dropdown>
            <DropdownTrigger>
              <Avatar className="cursor-pointer" src={CurrentuserData?.data?.profilePhoto || 'https://cdn-icons-png.flaticon.com/512/64/64572.png'} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions"
            >
              {/* <DropdownItem key="profile" onPress={() => handleNavigation("/profile")}> */}
              <DropdownItem key="profile" href='/profile'>
                Profile
              </DropdownItem>
              <DropdownItem key="AboutUs" href='/AboutUs'>
                About us
              </DropdownItem>
              <DropdownItem key="ContactUs" href='/ContactUs'>
                Contact Us
              </DropdownItem>
              {/* <DropdownItem  key="setting" onPress={() => handleNavigation("/profile/settings")}>
                Settings
              </DropdownItem>
              <DropdownItem key="create-post" onPress={() => handleNavigation("/profile/create-post")}>
                Create Post
              </DropdownItem> */}
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => handleLogout()}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </>
    )
};

export default NavbarDropDown;