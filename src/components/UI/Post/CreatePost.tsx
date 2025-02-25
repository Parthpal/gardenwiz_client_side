/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalProps,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

import TextEditor from "../RichTextEditor/TextEditor";
import GWInput from "../Form/GWInput";
import GWForm from "../Form/GWForm";
import GWSelect from "../Form/GWSelect";

import { fetchCategory } from "@/src//service/categories";
import { UsefetchCategories } from "@/src//hooks/categories.hook";
import { postData } from "@/src//service/post";
import { getCurrentUser } from "@/src//service/AuthService";
import { useUser } from "@/src//context/user.provider";
import { useCreatePost } from "@/src//hooks/post.hook";
import { UseGetUsersById } from "@/src//hooks/users.hook";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

const CreatePost = () => {
  const {user}=useUser();
  const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
  const{mutate:createPostMutate}=useCreatePost();
  const [tagsData,setTagsData]=useState([]);
  const [scrollBehavior, setScrollBehavior] =React.useState<ModalProps["scrollBehavior"]>('outside');
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
  const [size, setSize] = React.useState<Sizes>("3xl");
  const sizes:Sizes[]=["3xl"];

  const handleOpen = (size : Sizes) => {
    setSize(size);
    onOpen();
  };

  const [content, setContent] = useState("");
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const submitHandler = methods.handleSubmit;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postGardenData = {
      ...data,
      content,
      userID:user?._id,
    };
    formData.append("data", JSON.stringify(postGardenData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
   // console.log(formData);
    // postData(formData)
    createPostMutate(formData)
    setTimeout(() => {
      onClose();
    }, 3000)
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
  //console.log(categoriesData?.data);
  //console.log(tagsData);
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
          <Card className="max-w-7xl my-4">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={CurrentuserData?.data?.profilePhoto || 'https://cdn-icons-png.flaticon.com/512/64/64572.png' }
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{CurrentuserData?.data?.name}</p>  
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
            <div className="flex flex-wrap">
                {sizes.map((size) => (
                  <Button  className="p-0 w-full bg-[#f4f4f4]" key={size} onPress={() => handleOpen(size)}>
                    <Input onValueChange={(v) => setScrollBehavior(v as ModalProps["scrollBehavior"])} className="w-full" size='lg' placeholder="What is in your mind" />
                  </Button>
                ))}
            </div>
            </CardBody>
            <Divider />
          </Card>

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
                            <GWSelect label="category" name="categoryID" options={categoryOption}/>
                            <GWSelect label="tags" name="tags" options={tagsOption}/>
                            <TextEditor content={content} setContent={setContent} />
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
                              Post
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

export default CreatePost;
