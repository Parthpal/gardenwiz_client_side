/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
"use client"
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import React, { useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentsIcon, Crown, DragDots, HeartIcon } from '../../icons';
import Link from 'next/link';
import { Ipost } from '../../../../types';
import { addComments, upvotePost } from '@/src//service/post';
import { useDOwnvote, useUpvote } from '@/src//hooks/post.hook';
import { useUser } from '@/src//context/user.provider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Tooltip } from '@heroui/tooltip';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';

interface IpostCardProps{
 posts:Ipost
}

const PostCard = ({posts}:IpostCardProps) => {
    const {user}=useUser();
    const{_id,title,images,content,upvotes,downvotes,comments,tags,userID}=posts;
    const {mutate:upVotemutation}=useUpvote();
    const {mutate:downVotemutation}=useDOwnvote();
    const [liked, setLiked] = React.useState(false);
    const handleUpvote=(id:any)=>{
        upVotemutation(id)
    }
    const handleDownvote=(id:any)=>{
        downVotemutation(id)
    } 
    const handleTriggerModal=()=>{
        Swal.fire({
            icon: "error",
            title: "You are not Verified User",
            text: "Make your Verification Done From Below Link",
           footer: '<a style="color: blue;" href="/profile/Checkout">Verify Your Account!</a>'   
          });
    } 
    return (
        <>
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-full mb-5 "
            shadow="sm"
            >
            <CardBody>
                <div className='flex flex-row-reverse justify-between '>
                    <div className="relative w-[30%]">
                        <Image
                        alt="image"
                        className="object-cover"
                        height={200}
                        shadow="md"
                        src={images[0]}
                        width="100%"
                        />
                    </div>

                <div className="flex flex-col col-span-6 md:col-span-8 w-[70%]">
                    <div className="flex justify-between items-start ">
                    <div className="flex flex-col gap-0 mt-4">
                        {tags==='Premium'? <h3 className="font-semibold text-foreground/90">{title} <span className='text-yellow-500'>Premium Content  <Crown className='inline-block text-2xl align-middle'/></span></h3>:<h3 className="font-semibold text-foreground/90">{title}</h3>}       
                        <p className="text-small text-foreground/80 mt-4 inline-block" dangerouslySetInnerHTML={{ __html: content.slice(0,250) }}></p>
                        <p></p>
                        {
                        (user?.status==='PREMIUM') ? 
                        <>
                        {                               
                            (user?.status==='PREMIUM') ?
                            <Link className="w-full text-sm flex justify-start my-2 p-0 bg-white" href={`/posts/${_id}`}>
                              Read More..
                            </Link>:<></>
                        }
                        </>:
                        <>
                        {
                            user?.status==='BASIC' && tags==='Premium' ?
                            <Button className="w-full text-sm flex justify-start my-2 p-0 bg-white" onPress={handleTriggerModal}>
                              Read More..
                            </Button>:<>
                            <Link className="w-full text-sm flex justify-start my-2 p-0 bg-white" href={`/posts/${_id}`}>
                              Read More..
                            </Link>
                            </>
                        }
                        </>
                        }
                    </div>
                    </div>
                </div>
                </div>
            </CardBody>
            <CardFooter className="flex w-full justify-between items-center my-5 align-middle">
            <div className="flex flex-col">
                    <div className="flex justify-around space-x-5 ">
                        <Button onPress={()=>handleUpvote(_id)} className="flex justify-around items-center bg-white">
                            <ArrowUpIcon/>
                            <p className="text-lg">{upvotes}</p>
                        </Button>
                        <Button onPress={()=>handleDownvote(_id)} className="flex justify-around items-center bg-white">
                            <ArrowDownIcon/>
                            <p className="text-lg">{downvotes}</p>
                        </Button>
                        <Link className="flex justify-around items-center bg-white gap-2 pl-5" href={`/posts/${_id}`}>
                        <CommentsIcon/>
                        <p className="text-lg">{comments?.length??'0'}</p>
                        </Link>
                    </div>
            </div>
            <div>
            <div className="flex align-middle">
            <Tooltip content="Add to Favorite">
            <Button isIconOnly aria-label="Like" color="success">
                <HeartIcon /> 
            </Button>
            </Tooltip>
            <p className="text-2xl">
              {
                    ((user?._id ===userID))?(
                        <>
                        <Dropdown>
                            <DropdownTrigger>
                            <Button className='p-0 mx-0 bg-white text-2xl'>
                            <DragDots/>
                            </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Link Actions">
                            <DropdownItem key='Edit'>
                                Edit
                            </DropdownItem>
                            <DropdownItem key="delete">
                                Delete
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </>):(
                <></>)
                }
            </p>
            </div>
            </div>
            </CardFooter>
        </Card>
        {/* <>
        <template id="my-template">
          <swal-title>Hey!</swal-title>
          <swal-html>
            <p>This is a custom modal created using SweetAlert2!</p>
          </swal-html>
        </template>
      </> */}
        </>
    );
};

export default PostCard;