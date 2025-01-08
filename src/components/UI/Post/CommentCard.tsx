/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import Link from 'next/link';
import React from 'react';
import { IComments } from '../../../../types';

const CommentCard = ({userComments}:IComments) => {
    const{comment,userID}=userComments;
    return (
        <Card className="max-w-full">
        <CardHeader className="flex gap-3">
            <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={userID.profilePhoto}
            width={40}
            />
            <div className="flex flex-col">
            <p className="text-small text-default-500">{userID.name}</p>
            </div>
        </CardHeader>
        <CardBody>
            <p>{comment}</p>
        </CardBody>
        <CardFooter>
        </CardFooter>
        </Card>
    );
};

export default CommentCard;