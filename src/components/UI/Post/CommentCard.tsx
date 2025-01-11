/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { IComments, IUser } from '../../../../types';
import { DotThreeIcons } from '../../icons';
import { Button } from '@nextui-org/button';
import { useUser } from '@/src//context/user.provider';
import { useRouter } from 'next/router';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { deleteComments, editComment } from '@/src//service/post';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import GWTextarea from '../Form/GWTextArea';

type ICommentProps={
userID:IUser,
comment:string,
_id:string,
createdAt?:string,
}
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const CommentCard = ({userComments,postId}:{userComments:ICommentProps,postId:any}) => {
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];
    const handleOpen = (size : Sizes) => {
        setSize(size);
        onOpen();
      };
    const {user:currentUser,isLoading:userLoading}=useUser();
    const{comment,userID:commentUserId,_id:commentID}=userComments;
    const handleDelete=(id:any)=>{
        deleteComments(id,postId);
    }
    const methods = useForm({});
    const { control, handleSubmit } = methods;
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentsData = {
        ...data,
        postId:postId
        };
        editComment(commentID,commentsData)
    };
    return (<>
        <Card className="max-w-full">
        <CardHeader className='flex justify-between'>
            <div>
            <Image
            alt={commentUserId?.name}
            height={40}
            radius="sm"
            src={commentUserId?.profilePhoto}
            width={40}
            />
            <div className="flex flex-col">
                <p className="text-small text-default-500">{commentUserId?.name}</p>
            </div>
            </div>
                {
                    ((currentUser!._id ===commentUserId?._id))?(
                        <>
                        <Dropdown>
                            <DropdownTrigger>
                            <Button className='p-0 mx-0 bg-white'>
                                <DotThreeIcons/>
                            </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Link Actions">
                            <DropdownItem key={size} onPress={() => handleOpen(size)}>
                                Edit
                            </DropdownItem>
                            <DropdownItem key="delete" onPress={()=>handleDelete(commentID)}>
                                Delete
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </>):(
                <></>)
                }
   
        </CardHeader>
        <CardBody>
            <p>{comment}</p>
        </CardBody>
        <CardFooter>
        </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Your Comment</ModalHeader>
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

export default CommentCard;