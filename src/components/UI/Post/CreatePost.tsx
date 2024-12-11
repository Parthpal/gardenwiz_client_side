/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import GWForm from "../Form/GWForm";
import GWInput from "../Form/GWInput";
import { Button } from "@nextui-org/button";
import JoditEditor from "jodit-react";
import TextEditor from "../RichTextEditor/TextEditor";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    const postData = {
      ...data,
      content,
    };
    formData.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
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

  return (
    <>
          <Card className="max-w-7xl my-4">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">Partha Pal</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
            <div className="flex flex-wrap">
                {sizes.map((size) => (
                  <Button className="w-full bg-[#f4f4f4]" key={size} onPress={() => handleOpen(size)}>
                    <Input className="w-full" size='lg' placeholder="What is in your mind" />
                  </Button>
                ))}
            </div>
            </CardBody>
            <Divider />
          </Card>
          <Modal
            isOpen={isOpen}
            size={size}
            placement="top-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Create a Post</ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <FormProvider {...methods}>
                          <form onSubmit={submitHandler(onSubmit)}>
                            <GWInput
                              className=" w-full my-2"
                              label="category"
                              name="category"
                            />
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
