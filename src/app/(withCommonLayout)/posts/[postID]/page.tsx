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
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import CommentCard from '@/src//components/UI/Post/CommentCard';
import { useAddComments, UseGetPostsId } from '@/src//hooks/post.hook';
import { UsefetchUsers, UseGetUsersById } from '@/src//hooks/users.hook';
import { useRouter } from 'next/navigation';
import PostDetailsLoading from './Loading';

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const PostDetails = ({ params }: { params: { postID: string } }) => {
    const{user,isLoading:userLoading}=useUser();
    const router = useRouter();
    const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
    const [postData,setPostData]=useState<Ipost|undefined|any>();
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];
    const{mutate:addCommentsMutation,isPending}=useAddComments();
    const {refetch,data:pData,isLoading:fetchLoading,isSuccess,isPending:postPending}=UseGetPostsId(params.postID);
    const handleOpen = (size : Sizes) => {
        setSize(size);
        onOpen();
      };
    
    useEffect(()=>{
            setPostData(pData)
            //console.log(data,'fetchId');
    },[pData])

    const methods = useForm({});
    const { control, handleSubmit } = methods;
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentsData = {
        ...data,
        userID:user?._id,
        };
        // addComments(params.postID,commentsData);
        addCommentsMutation({ id: params.postID, commentData: commentsData })
    };
    //console.log(postData?.userID );
    if(userLoading || currentuserload){
      return <PostDetailsLoading/>
    }
    if(isPending || postPending ){
      return <PostDetailsLoading/>
    }
    return (
      <>
      {
    CurrentuserData?.data?.status==='BASIC' && postData?.tags==='Beginners' ||
    CurrentuserData?.data?.status==='PREMIUM' && postData?.tags==='Premium' ||
    CurrentuserData?.data?.status==='PREMIUM' && postData?.tags==='Beginners' ||
    CurrentuserData?.data?._id === postData?.userID && postData?.tags==='Premium' && CurrentuserData?.data?.status==='BASIC'  ||
    CurrentuserData?.data?._id === postData?.userID && postData?.tags==='Beginners' && CurrentuserData?.data?.status==='PREMIUM'  ? <>
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
       {postData?.images?.map((image:any, index:any) => (
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
               postData?.comments?.map((userComments:any)=>(
                 <CommentCard key={userComments._id} postId={postData?._id} userComments={userComments}/>
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
                         {isPending?'Comment Adding':'Add Comment'}
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
   </>:<>
      <div className="flex justify-center items-center min-h-screen">
          <Card className="w-full max-w-md p-6 text-center shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-red-600">Access Denied</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-4 text-gray-700">
                You are not a paid user, so you cannot access the paid content.
              </p>
              <p className="mb-6 text-gray-600">
                Go to the home page to check out free content, or verify your account.
              </p>
              <div className="flex justify-center gap-4">
                <Button color="primary" onPress={() => router.push("/")}>
                  Go to Home
                </Button>
                <Button color="secondary" onPress={() => router.push("/profile/Checkout")}>
                  Verify Account
                </Button>
              </div>
            </CardBody>
          </Card>
      </div>
    </>
};
   </>

    );
};

export default PostDetails;