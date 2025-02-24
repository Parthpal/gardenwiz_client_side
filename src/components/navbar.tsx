/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "../components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
  TreeIcon,
} from "../components/icons";
import { Avatar } from "@nextui-org/avatar";
import NavbarDropDown from "./NavbarDropDown";
import { useUser } from "../context/user.provider";
import { useForm } from "react-hook-form";
import useDebounce from "../hooks/debounce.hook";
import React, { useEffect, useState } from "react";
import { useSearchItems } from "../hooks/search.hook";
import { searchItems } from "../service/Search";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from "@nextui-org/modal";
import { Ipost } from "../../types";
import PostCard from "./UI/Post/PostCard";
import { UseGetUsersById } from "../hooks/users.hook";
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
export const Navbar = () => {
  const {user}=useUser();
  const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
  const [searchResult,setSearchResult]=useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
 // console.log(useDebounce(watch('searchInput')));
  const { mutate: handleSearch, data:searchedResultData,isPending,isSuccess } = useSearchItems();
   // console.log(data);
   const searchTerm = useDebounce(watch("searchInput"));
  // console.log(searchTerm);
    const {isOpen, onOpen, onClose,onOpenChange} = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("2xl");
  useEffect(() => {
    if (searchTerm) {
       handleSearch(searchTerm);
      // searchItems(searchTerm)
    }
  }, [searchTerm]);
  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
    }
    if(!isPending && isSuccess && searchedResultData && searchTerm){
      onOpen(); // for modal opening
      setSearchResult(searchedResultData?.data || []); 
    }
  }, [searchTerm, isPending, isSuccess, searchedResultData]);
  //console.log(searchResult,'current search');
  
  const handleOpen = (size : Sizes) => {
    setSize(size);
    onOpen();
  };

  const onSubmit = () =>{
    // searchItems(data);
    onClose()
  }

  return (<>
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <TreeIcon />
            <p className="font-bold text-inherit">GardenWiz</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
         <NavbarItem className="hidden sm:flex gap-2">
         <Button isIconOnly variant="light" className="text-medium"  key={size} onPress={() => handleOpen(size)}>
          <SearchIcon/>
        </Button>
           <ThemeSwitch />
        </NavbarItem>

          {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
              <NavbarDropDown/>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}

      </NavbarContent>     

       <NavbarContent className="sm:hidden basis-1" justify="end">
       <Button isIconOnly variant="light"  key={size} onPress={() => handleOpen(size)}>
          <SearchIcon/>
        </Button>
        <ThemeSwitch />
        {/* <NavbarMenuToggle /> */}
        <div className="flex gap-3 items-center">
        <NavbarDropDown/>
        </div>
      </NavbarContent>
    

      <NavbarMenu>
        {/* {searchInput} */}
        {/* <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div> */}
      </NavbarMenu>
    </NextUINavbar>
    <Modal isOpen={isOpen}
        onOpenChange={onOpenChange} 
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={size}
        scrollBehavior='inside'
        placement="top"
          >
            <ModalContent>
                {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input {...register("searchInput", { required: true })}
                    classNames={{
                      base: "max-w-full h-10",
                      mainWrapper: "h-full",
                      input: "text-small",
                      inputWrapper:
                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                    
                  />
                  </form>

                </ModalHeader>
                {searchResult?.length > 0 && user?.email ? (<ModalBody>
                  <p>
                    {
                      searchResult.map((posts:any,index)=>
                        <Link key={index} href={`/posts/${posts._id}`}>
                        <Card  className="max-w-full shadow-xl mt-2">
                            <CardHeader className="flex gap-3">
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">{posts.title}</p>
                              </div>
                            </CardHeader>
                            <CardBody>
                            <p className="text-small text-foreground/80 inline-block" dangerouslySetInnerHTML={{ __html: posts.content.slice(0,100) }}></p>
                            </CardBody>
                        </Card>  
                        </Link>
                      )
                    } 
                  </p>
                </ModalBody>):<>
                </>}
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
         </Modal>  
    </>
  );
};
