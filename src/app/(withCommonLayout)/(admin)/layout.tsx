/* eslint-disable prettier/prettier */
'use client'
import React, { ReactNode, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
  } from "@heroui/drawer";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

export default function Layout({ children }: { children: ReactNode }) {
  const {isOpen, onOpen, onClose,onOpenChange} = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  const [size, setSize] = useState("md");
  const handleOpen = (size) => {
    setSize(size);
    onOpen
  };
  
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];

  return (<>
     <div className="flex flex-row">
        <div className="w-[20%] min-h-screen border-1 border-black bg-[#16a34a] space-y-4">
          <h1 className="text-center text-white">Admin layout</h1>
          {/*user Management */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full rounded-none bg-white">User Management</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="getAllUser" href="/admin/GetAllUsers" >Get All Users</DropdownItem>
            </DropdownMenu>
         </Dropdown>
          {/*Post Management */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full rounded-none bg-white">Post Management</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="getAllPost" href="/admin/GetAllPosts">Get All Posts</DropdownItem>
            </DropdownMenu>
         </Dropdown>
          {/*Payment History */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full rounded-none bg-white">Payment History</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="displayTransactions" href="/admin/GetPaymentDetails">Display Transactions</DropdownItem>
            </DropdownMenu>
         </Dropdown>
          {/*Graphs & Analytics: */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full rounded-none bg-white">Graphs & Analytics</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="postPerMonth">Monthly Payments</DropdownItem>
              <DropdownItem key="copy" href="/admin/PostPerMonth">Posts Per month</DropdownItem>
              <DropdownItem key="edit">User Activity</DropdownItem>
            </DropdownMenu>
         </Dropdown>
        </div>
        <div className="w-[80%] min-h-screen border-1 border-black">
            {children}
        </div>
    </div>
    </>);
}

