/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { log } from 'console';

import { Card, CardBody } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRouter } from 'next/navigation';

import GWInput from '../Form/GWInput';
import GWSelect from '../Form/GWSelect';
import TextEditor from '../RichTextEditor/TextEditor';
import GWForm from '../Form/GWForm';

import { updateUser } from '@/src//service/Profile';
import { changePassword, logout } from '@/src//service/AuthService';
import { useUserChangePassword } from '@/src//hooks/auth.hook';
import { useUser } from '@/src//context/user.provider';
import { UseGetUsersById, useUpdateUser } from '@/src//hooks/users.hook';
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
const UpdateProfile = ({onClose}:any) => {
  const router = useRouter();
    const {user}=useUser();
    const {data:CurrentuserData,isLoading:currentuserload}=UseGetUsersById(user?._id);
    const{mutate:userDataUpdateMutate}=useUpdateUser();
    const {mutate:passwordChange,isSuccess:passwordSuccess,isPending:passPending}=useUserChangePassword();
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreviews, setImagePreviews] = useState<string>('');
    const { isOpen, onOpen,onOpenChange } = useDisclosure();
    const [size, setSize] = React.useState<Sizes>("3xl");
    const sizes:Sizes[]=["3xl"];

  
    const handleOpen = (size : Sizes) => {
      setSize(size);
      onOpen();
    };
    const methods = useForm({
      defaultValues: {
        name: CurrentuserData?.data?.name,
        email: CurrentuserData?.data?.email,
        profilePhoto:CurrentuserData?.data?.profilePhoto,
      },});
      const { control, handleSubmit } = methods;
      const submitHandler = methods.handleSubmit;
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const userData = new FormData();
       //const images:string[]=[];

        for (let image of imageFiles) {
            if(image instanceof File)  {
              userData.append("profilePhoto", image);
              delete data.profilePhoto
            }
        }
        const updatedUserData = {
          ...data,
        };
        userData.append("data", JSON.stringify(updatedUserData));
        //console.log(userData);
       // postData(formData)
        userDataUpdateMutate({ userData , id:user?._id })
       //updateUser(formData,user!._id)

       setTimeout(() => {
        onClose();
      }, 2000)
      };
      const onSubmitChangePassword:SubmitHandler<FieldValues>=(data)=>{
          passwordChange(data);  
      }
      // useEffect(() => {
      //   if (passwordSuccess && !passPending) {
      //     logout(); // Ensure user is logged out before redirecting
      //     // router.push("/login");
      //   }
      // }, [passwordSuccess]);
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
      {(onClose) => (<>
      <ModalHeader className="flex flex-col gap-1">Update Profile</ModalHeader>
      <ModalBody>
      <Tabs>
          <TabList>
                  <Tab>Edit Profile</Tab>
                  <Tab>Change Password</Tab>
          </TabList>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                  <GWForm onSubmit={onSubmitChangePassword}>
                  <GWInput  className="my-5 px-5 " color="primary" label="Old Password" name="oldPassword" type="password" />
                  <GWInput className="my-5 px-5" color="primary" label="New Password" name="newPassword" type="password"  />
                  <Button
                  className="w-full my-2 rounded-md bg-primary font-semibold text-white"
                  size="lg"
                  type="submit"
                >
                  Submit
                  </Button>
                  </GWForm>
                </TabPanel>
             </Tabs>
      </ModalBody>
      </>
      )}
</ModalContent> 
            );
};

export default UpdateProfile;