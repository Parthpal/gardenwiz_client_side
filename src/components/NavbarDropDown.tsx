/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { useUser } from '../context/user.provider';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../service/AuthService';
import { protectedRoutes } from '../constant';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';

const NavbarDropDown = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setIsLoading: userLoading } = useUser();
    const handleLogout = () => {
        logout();
        userLoading(true);
    
        if (protectedRoutes.some((route) => pathname.match(route))) {
          router.push("/");
        }
      };
      const handleNavigation = (pathname: string) => {
        router.push(pathname);
      };
    return (
        <>
          <Dropdown>
            <DropdownTrigger>
              <Avatar className="cursor-pointer" src={user?.profilePhoto} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {/* <DropdownItem key="profile" onPress={() => handleNavigation("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem  key="setting" onPress={() => handleNavigation("/profile/settings")}>
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