/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
"use client"
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CommentsIcon, Crown, DragDots, HeartIcon } from '../../icons';
import Link from 'next/link';
import { Ipost, IUser } from '../../../../types';
import { addComments, postData, updatePostData, upvotePost } from '@/src//service/post';
import { useDeletePosts, useDOwnvote, useUpvote } from '@/src//hooks/post.hook';
import { useUser } from '@/src//context/user.provider';
import Swal from 'sweetalert2';
import { Tooltip } from '@heroui/tooltip';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from '@nextui-org/modal';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import GWInput from '../Form/GWInput';
import GWSelect from '../Form/GWSelect';
import TextEditor from '../RichTextEditor/TextEditor';
import { UsefetchCategories } from '@/src//hooks/categories.hook';
import { addFavouritePosts } from '@/src//service/Profile';
import { useAddFavouritePost, UsefetchUsers, UseGetUsersById } from '@/src//hooks/users.hook';
import { Divider } from '@nextui-org/divider';
import { Avatar } from '@nextui-org/avatar';

interface IpostCardProps{
 posts:any
}
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const PostCard = ({posts}:IpostCardProps) => {
    const {user,isLoading:userLoading}=useUser();
    const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
    const { data:userdata} = UsefetchUsers();
    //const [cUser,setcUser]=useState<IUser>([])
   // console.log(userdata?.data);
    const [filteredUserData, setFilteredUserData] = useState<IUser[]>([]);
    useEffect(()=>{
      const CurrentUser:IUser[]=user?userdata?.data?.filter((userData:IUser)=>userData?._id===user._id):[];
      setFilteredUserData(CurrentUser ?? [])
    },[user,userLoading])
    // console.log(cUser);
    //console.log(filteredUserData);
    const{_id,title,images,content:postContent,upvotes,downvotes,comments,tags,userID,categoryID}=posts;
    const {mutate:upVotemutation}=useUpvote();
    const {mutate:downVotemutation}=useDOwnvote();
    const {mutate:deletePostMutate}=useDeletePosts();
    const {mutate:addFavoritePostMutate}=useAddFavouritePost();
    const [liked, setLiked] = React.useState(false);
    const [tagsData,setTagsData]=React.useState([]);
    const [scrollBehavior, setScrollBehavior] =React.useState<ModalProps["scrollBehavior"]>('outside');
    const [imageFiles, setImageFiles] = React.useState<File[] | string[]>(images);
    const [imagePreviews, setImagePreviews] = React.useState<string[] | []>(images);
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];
    const handleOpen = (size : Sizes) => {
      setSize(size);
      onOpen();
    }; 
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
    const handleDelete=(id:any)=>{
        deletePostMutate({id});
      }
       // post update related functions
    const [content, setContent] = React.useState(postContent);
    const methods =  useForm({
          defaultValues: {
            title: title,
            categoryID:categoryID,
            tags: tags,
          },});
    const { control, handleSubmit } = methods;
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const formData = new FormData();
      const images:string[]=[];
      //console.log(images);   
      for (let image of imageFiles) {
       // console.log(image,'imagedata');
        if(typeof image === 'string')  {
          images.push(image)
        }
        else{
          formData.append("itemImages", image);
        }
      }
      const updateGardenData = {
        ...data,
        content,
        images
      };
     formData.append("data", JSON.stringify(updateGardenData));
     //console.log(formData);
     updatePostData(formData,_id)
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      setImageFiles((prev) => [...prev, file]);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
      
    };
    const handleDeleteImage = (index: number) => {
        // Remove the image preview and file at the given index
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
      };
    const addToFavourite=(id:string)=>{
      //alert('add to fab clicked'+id)
     // addFavouritePosts(user?._id,{postID:id})
     let userId=user?._id;
     let postData={
      postID:id
     }
      addFavoritePostMutate({ userId, postData })
    }
    const {
      data: categoriesData,
      isLoading: categoryLoading,
      isSuccess: categorySuccess,
    } = UsefetchCategories();
   // console.log(categoriesData);
    useEffect(() => {
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => setTagsData(data));
    }, []);
    let categoryOption: { key: string; label: string }[] = [];
    let tagsOption: { key: string; label: string }[] = [];
   // console.log(categoriesData?.data);
   // console.log(tagsData);
      if (categoriesData?.data && !categoryLoading) {
        categoryOption = categoriesData.data
          .sort()
          .map((category: { _id: string; name: string }) => ({
            key: category._id,
            label: category.name,
          }));
      }
      if (tagsData) {
        tagsOption = tagsData.sort()
          .map((tag:{id: string; name: string }) => ({
            key: tag.name,
            label: tag.name,
          }));
      }
    return (
        <>
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-full mb-5 "
            shadow="sm"
            >
            <CardHeader className="flex gap-3">
              <Avatar isBordered radius="md" src={userID?.profilePhoto} />
              <div className="flex flex-col">
                <p className="text-md">{userID?.name}</p>
              </div>
            </CardHeader>
            <Divider />
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

                <div className="flex flex-col col-span-6 md:col-span-8 w-[65%]">
                    <div className="flex justify-between items-start ">
                    <div className="flex flex-col gap-0 mt-4">
                        {tags==='Premium'? <h3 className="font-semibold text-foreground/90">{title} <span className='text-yellow-500'>Premium<Crown className='inline-block text-2xl align-middle'/></span></h3>:<h3 className="font-semibold text-foreground/90">{title}</h3>}       
                        <p className="text-small text-foreground/80 mt-4 inline-block" dangerouslySetInnerHTML={{ __html: postContent.slice(0,250) }}></p>
                        <p></p>
                        {
                        (CurrentuserData?.data?.status==='PREMIUM') ? 
                        <>
                        {                               
                            (CurrentuserData?.data?.status==='PREMIUM') ?
                            <Link className="w-full text-sm flex justify-start my-2 p-0 bg-white" href={`/posts/${_id}`}>
                            Read More..
                            </Link>:<></>
                        }
                        </>:
                        <>
                        {
                            (CurrentuserData?.data?.status==='BASIC' && tags==='Premium' && userID._id!==CurrentuserData?.data?._id) ?
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
            
              {
                filteredUserData[0]?.favoritePosts?.includes(_id)?
                <></>:
                <>
                  <Tooltip content="Add to Favorite">
                    <Button  isIconOnly aria-label="Like" color="success" onPress={()=>addToFavourite(_id)}>
                        <HeartIcon /> 
                    </Button>
                  </Tooltip>
                </>
              }

            <p className="text-2xl">
            {
                ((CurrentuserData?.data?._id ===userID._id))?(
                        <>
                        <Dropdown>
                            <DropdownTrigger>
                            <Button className='p-0 mx-0 bg-white text-2xl'>
                            <DragDots/>
                            </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Link Actions">
                            <DropdownItem key={size} onPress={() => handleOpen(size)}>
                                Edit
                            </DropdownItem>
                            <DropdownItem key="delete" onPress={()=>handleDelete(_id)}>
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
        {/* Edit post modal */}
        <Modal isOpen={isOpen}
        onOpenChange={onOpenChange} 
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size={size}
        scrollBehavior={scrollBehavior}
        >
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Create a Post</ModalHeader>
                <ModalBody>
                <Card>
                    <CardBody>
                    <FormProvider {...methods}>
                        <form className="space-y-5" onSubmit={submitHandler(onSubmit)}>
                        <GWInput label="title" name="title"/>
                        <GWSelect label="category" name="categoryID" options={categoryOption} defaultSelectedKeys={[categoryID]}/>
                        <GWSelect label="tags" name="tags" options={tagsOption} defaultSelectedKeys={[tags]}/>
                        <TextEditor content={postContent} setContent={setContent} />
                        <div className="min-w-fit flex-1">
                            <label
                                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                                htmlFor="image"
                            >
                                Upload image
                            </label>
                            <input
                                multiple
                                className="hidden"
                                id="image"
                                type="file"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="flex gap-5 my-5 flex-wrap">
                              {imagePreviews.map((imageDataUrl, index) => (
                                <div
                                  key={imageDataUrl}
                                  className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                                >
                                  <img
                                    alt="item"
                                    className="h-full w-full object-cover object-center rounded-md"
                                    src={imageDataUrl}
                                  />
                                  {/* Add the delete button */}
                                  <button
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm"
                                    onClick={() => handleDeleteImage(index)}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}  
                        <Button color="primary" className='w-full my-2' size="lg" type="submit">
                            Update Post
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

export default PostCard;