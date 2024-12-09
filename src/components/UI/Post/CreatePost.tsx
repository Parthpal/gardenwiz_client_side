/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useRef, useState } from "react";
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
    const postData = {
      ...data,
      content,
    };
    console.log(postData);
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
                        <GWInput
                          className=" w-full my-2"
                          label="Add Image"
                          name="Add Image"
                        />
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
