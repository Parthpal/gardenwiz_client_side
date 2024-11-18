/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
"use client"
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentsIcon } from '../../icons';
const PostCard = () => {
    const [liked, setLiked] = React.useState(false);
    return (
        <>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 w-[720px]"
                shadow="sm"
                >
                <CardBody>
                    <div className='flex flex-row-reverse justify-between'>
                        <div className="relative ">
                            <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src="https://res.cloudinary.com/dfelm3bvn/image/upload/v1731784033/gardening-2518377_1280_c2oopy.jpg"
                            width="100%"
                            />
                        </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start ">
                        <div className="flex flex-col gap-0 mt-4">
                            <h3 className="font-semibold text-foreground/90">Looking Better Than 99% of People Over 40 is About One Thing</h3>
                            <p className="text-small text-foreground/80 mt-4">Not specific workouts, diets, supplements, or ‘hacks’. Once you nail this there’s no stopping you.</p>
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
                            <div className="flex justify-around items-center gap-2">
                                <ArrowUpIcon/>
                                <p className="text-lg">100</p>
                            </div>
                            <div className="flex justify-around items-center gap-2">
                                <ArrowDownIcon/>
                                <p className="text-lg">123</p>
                            </div>
                            <div className="flex justify-around items-center gap-2">
                                <CommentsIcon/>
                                <p className="text-lg">23</p>
                            </div>

                        </div>
                        </div>

                        <div className="flex w-full items-center justify-center">
                        <Button
                            isIconOnly
                            className="data-[hover]:bg-foreground/10"
                            radius="full"
                            variant="light"
                        >
                            {/* <RepeatOneIcon className="text-foreground/80" /> */}
                        </Button>
                        <Button
                            isIconOnly
                            className="data-[hover]:bg-foreground/10"
                            radius="full"
                            variant="light"
                        >
                            {/* <PreviousIcon /> */}
                        </Button>
                        <Button
                            isIconOnly
                            className="w-auto h-auto data-[hover]:bg-foreground/10"
                            radius="full"
                            variant="light"
                        >
                            {/* <PauseCircleIcon size={54} /> */}
                        </Button>
                        <Button
                            isIconOnly
                            className="data-[hover]:bg-foreground/10"
                            radius="full"
                            variant="light"
                        >
                            {/* <NextIcon /> */}
                        </Button>
                        <Button
                            isIconOnly
                            className="data-[hover]:bg-foreground/10"
                            radius="full"
                            variant="light"
                        >
                            {/* <ShuffleIcon className="text-foreground/80" /> */}
                        </Button>
                        </div>
                    </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default PostCard;