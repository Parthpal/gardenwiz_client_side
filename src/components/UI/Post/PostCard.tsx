/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
"use client"
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import React, { useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentsIcon } from '../../icons';
import Link from 'next/link';
import { Ipost } from '../../../../types';
import { addComments, upvotePost } from '@/src//service/post';
import { useDOwnvote, useUpvote } from '@/src//hooks/post.hook';
import { useUser } from '@/src//context/user.provider';
interface IpostCardProps{
 posts:Ipost
}

const PostCard = ({posts}:IpostCardProps) => {
    const{_id,title,images,content,upvotes,downvotes,comments}=posts;
    const {mutate:upVotemutation}=useUpvote();
    const {mutate:downVotemutation}=useDOwnvote();
    const [liked, setLiked] = React.useState(false);
    const handleUpvote=(id:any)=>{
        upVotemutation(id)
    }
    const handleDownvote=(id:any)=>{
        downVotemutation(id)
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
                            alt="Album cover"
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
                            <h3 className="font-semibold text-foreground/90">{title}</h3>
                            <p className="text-small text-foreground/80 mt-4" dangerouslySetInnerHTML={{ __html: content.slice(0,250) }}></p>
                            <p></p>
                            <Link href={`/posts/${_id}`}>
                              Read More..
                            </Link>
                        </div>
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => setLiked((v) => !v)}
                        >
                        </Button>
                        </div>

                        <div className="flex flex-col mt-10 gap-1 ">
                        {/* <Slider
                            aria-label="Music progress"
                            classNames={{
                            track: "bg-default-500/30",
                            thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                            }}
                            color="foreground"
                            defaultValue={33}
                            size="sm"
                        /> */}
                        <div className="flex justify-around">
                            <Button onPress={()=>handleUpvote(_id)} className="flex justify-around items-center gap-2 bg-white">
                                <ArrowUpIcon/>
                                <p className="text-lg">{upvotes}</p>
                            </Button>
                            <Button onPress={()=>handleDownvote(_id)} className="flex justify-around items-center gap-2 bg-white">
                                <ArrowDownIcon/>
                                <p className="text-lg">{downvotes}</p>
                            </Button>
                            <Link className="flex justify-around items-center gap-2 bg-white" href={`/posts/${_id}`}>
                            <CommentsIcon/>
                            <p className="text-lg">{comments?.length??'0'}</p>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </CardBody>
            </Card>

        </>
    );
};

export default PostCard;