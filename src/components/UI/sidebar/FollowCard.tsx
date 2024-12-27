/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable prettier/prettier */
"use client"
import { UsefetchUsers } from '@/src//hooks/users.hook';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader } from '@nextui-org/card';
import React from 'react';

const FollowCard = ({user}) => {
   
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <>
            <Card className="max-w-[340px] my-2">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={user?.profilePhoto}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
                    </div>
                    </div>
                    <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                    >
                    {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                </CardHeader>
            </Card>
        </>
    );
};

export default FollowCard;