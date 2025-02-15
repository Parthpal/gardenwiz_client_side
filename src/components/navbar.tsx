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
import { useEffect, useState } from "react";
import { useSearchItems } from "../hooks/search.hook";
import { searchItems } from "../service/Search";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from "@nextui-org/modal";
import { Ipost } from "../../types";
import PostCard from "./UI/Post/PostCard";

export const Navbar = () => {
  const {user}=useUser();
  const [searchResult,setSearchResult]=useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
 // console.log(useDebounce(watch('searchInput')));
  const { mutate: handleSearch, data,isPending,isSuccess } = useSearchItems();
    console.log(data);
   const searchTerm = useDebounce(watch("searchInput"));
   // console.log(searchTerm);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [size, setSize] = useState("md");
   // const [scrollBehavior, setScrollBehavior] =useState<ModalProps["scrollBehavior"]>('outside');
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
    }
    if(!isPending && isSuccess && data && searchTerm){
      setSearchResult(data?.data?.hits || []); 
      onOpen(); // for modal opening
    }
  }, [searchTerm, isPending, isSuccess, data]);
  const onSubmit = () =>{
    // searchItems(data);
  }
  
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <TreeIcon />
            <p className="font-bold text-inherit">GardenWiz</p>
          </NextLink>
        </NavbarBrand>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("searchInput", { required: true })}
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
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
          {searchResult?.length > 0 ? (
            <Modal  isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="inside">
             <ModalContent>
               {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1">Searched Post</ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          ):<></>
          }
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item:any) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
         <NavbarItem className="hidden sm:flex gap-2">
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

       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
        <div className="flex gap-3 items-center">
        <Avatar name={user?.name}/>
        <NavbarDropDown/>
        </div>
      </NavbarContent>
    

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
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
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
