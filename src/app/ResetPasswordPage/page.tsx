/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GWInput from '../../components/UI/Form/GWInput';
import { Button } from '@nextui-org/button';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { resetPassword } from '../../service/AuthService';
import { toast, Toaster } from 'sonner';
import { useResetPassword } from '../../hooks/auth.hook';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router=useRouter();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const {mutate:resetPasswordMutate,isSuccess,isPending}=useResetPassword();
    const methods = useForm({
      defaultValues: {
        email:email,
      },});
    const { control, handleSubmit } = methods;
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if(!email && !token){    
        return toast.error('Your are Unauthorized to access this')
      }

      const userData = {
        ...data,
      };
      console.log(userData);
      
      //formData.append("data", JSON.stringify(postGardenData));
      resetPasswordMutate({userData, token});  
    }
    useEffect(() => {
      if (!isPending && isSuccess) {  // Ensure isSuccess is true
        router.push('/login')
      }
    }, [isPending, isSuccess]); // Added `onClose` in dependencies
  return (<>
  <div className='flex justify-center items-center h-[50vh] lg:h-[80vh]'>
  <Card className="w-96">
      <CardHeader className="flex gap-3">
        <div className="text-center">
          <p className="text-md">Reset Password Link</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <FormProvider {...methods}>
              <form className="space-y-5" onSubmit={submitHandler(onSubmit)}>
                <GWInput label="Email" name="email" type='email'/>
                <GWInput label="New Password" name="newPassword" type='password'/>
                <Button color="primary" className='w-full my-2' size="lg" type="submit">
                  Change Password
                </Button>
              </form>
        </FormProvider>
      </CardBody>
    </Card>
    <Toaster />
  </div>

  
  </>);
}
