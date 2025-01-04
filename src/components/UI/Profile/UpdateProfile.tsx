/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { useUser } from '@/src//context/user.provider';
import { Card, CardBody } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { ChangeEvent, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import GWInput from '../Form/GWInput';
import GWSelect from '../Form/GWSelect';
import TextEditor from '../RichTextEditor/TextEditor';
import { Button } from '@nextui-org/button';
import { log } from 'console';
import { updateUser } from '@/src//service/Profile';
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const UpdateProfile = () => {
    const {user}=useUser();
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreviews, setImagePreviews] = useState<string>('');
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];
  
    const handleOpen = (size : Sizes) => {
      setSize(size);
      onOpen();
    };
    const methods = useForm({
      defaultValues: {
        name: user?.name,
        email: user?.email,
        profilePhoto: user?.profilePhoto,
      },});
      const { control, handleSubmit } = methods;
      const submitHandler = methods.handleSubmit;
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData();
        const postGardenData = {
          ...data,
        };
        formData.append("data", JSON.stringify(postGardenData));
        for (let image of imageFiles) {
          formData.append("profilePhoto", image);
        }
         console.log(formData);
       // postData(formData)
       updateUser(formData,user!._id)
      };
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImageFiles((prev) => [...prev, file]);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
       // console.log(imageFiles);
       const handleDeleteImage = () => {
        // Remove the image preview and file at the given index
       // setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImageFiles([]);
      }

    return (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Update Your Profile</ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <FormProvider {...methods}>
                          <form className="space-y-5" onSubmit={submitHandler(onSubmit)}>
                            <GWInput  label="name" name="name"/>
                            <GWInput label="email" name="email"/>
                            <div className="min-w-fit flex-1">
                                <label
                                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                                  htmlFor="image"
                                >
                                  Upload image
                                </label>
                                <input
                                  className="hidden"
                                  id="image"
                                  type="file"
                                  onChange={(e) => handleImageChange(e)}
                                />
                            </div>
                            {
                              imageFiles?.length ?
                              <div
                              key={imagePreviews}
                              className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                            >
                              <img
                                alt="item"
                                className="h-full w-full object-cover object-center rounded-md"
                                src={imagePreviews}
                              />
                              {/* Add the delete button */}
                              <button
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm"
                                onClick={()=>handleDeleteImage()}
                              >
                                ✕
                              </button>
                        </div> :
                        <></>
                            }

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
         
    );
};

export default UpdateProfile;