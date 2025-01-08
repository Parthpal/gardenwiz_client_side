/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { addComments, fetchPostFromID } from '@/src//service/post';
import React, { useEffect, useState } from 'react';
import { IComments, Ipost } from '../../../../../types';
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from '@nextui-org/modal';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/src//context/user.provider';
import GWTextarea from '@/src//components/UI/Form/GWTextArea';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import CommentCard from '@/src//components/UI/Post/CommentCard';

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const PostDetails = ({ params }: { params: { postID: string } }) => {
    const{user}=useUser();
    const [postData,setPostData]=useState<Ipost|undefined>(undefined);
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];
    const handleOpen = (size : Sizes) => {
        setSize(size);
        onOpen();
      };
    useEffect(()=>{
        fetchPostFromID(params.postID)
        .then(data=>{
            setPostData(data.data)
        })
    },[])
    const methods = useForm({});
    const { control, handleSubmit } = methods;
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentsData = {
        ...data,
        userID:user?._id,
        };
        addComments(params.postID,commentsData);
    };
    return (
        <>
         <div className='grid grid-cols-1 lg:grid-cols-[1fr,3fr,1fr] mx-5'>
            <div></div>
            <div className='w-full space-y-4'>
            <h5 className='font-semibold text-2xl text-center'>{postData?.title}</h5>
            <p className='font-light text-md text-justify' dangerouslySetInnerHTML={{ __html:postData?.content as string} }/>
            <LightGallery
            elementClassNames={` mt-2 gap-2 grid place-items-center ${postData?.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
            plugins={[lgThumbnail, lgZoom]}
            speed={500}
            >
            {postData?.images?.map((image, index) => (
                <Link
                key={index}
                className={`w-full ${postData?.images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"}`}
                href={image}
                >
                <Image
                    alt={`image-${index}`}
                    className="h-[400px] w-full object-cover"
                    height={500}
                    src={image}
                    width={500}
                />
                </Link>
            ))}
            </LightGallery>
            <div className="flex flex-wrap">
                {sizes.map((size) => (
                  <Button className="w-full h-full bg-white p-0" key={size} onPress={() => handleOpen(size)}>
                        <Textarea
                        disableAnimation
                        disableAutosize
                        classNames={{
                            base: "w-full outline-none",
                            input: "resize-y border-0 min-h-[100px]",
                        }}
                        label=""
                        placeholder="What your thoughts"
                        variant="bordered"
                        />
                  </Button>
                ))}
            </div>
            <div className='space-y-4'>
             {postData?.comments?.length?<h1 className='font-semibold text-2xl'>All Comments</h1>:<h1 className='font-semibold text-2xl'>No Comments</h1>}
                {
                    postData?.comments?.map((userComments:IComments)=>(
                      <CommentCard key={userComments._id} userComments={userComments}/>
                    )
                    )
             }
            </div>
            </div>
            <div></div>
         </div>
                     {/* comment modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Add Your Comments</ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <FormProvider {...methods}>
                          <form className="space-y-5" onSubmit={submitHandler(onSubmit)}>
                            <GWTextarea
                            name='comments'
                            className="max-w-lg"
                            label="Description"/>
                            <Button color="primary" className='w-full my-2' size="lg" type="submit">
                              Add Comment
                            </Button>
                          </form>
                        </FormProvider>
                      </CardBody>
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
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

export default PostDetails;