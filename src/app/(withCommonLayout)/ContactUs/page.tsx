/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import GWInput from '@/src//components/UI/Form/GWInput';
import GWTextarea from '@/src//components/UI/Form/GWTextArea';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'sonner';

const ContactUs = () => {
      const methods = useForm();
      const { control, handleSubmit } = methods;
      const submitHandler = methods.handleSubmit;
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const emailData = {
          ...data,
        };
        emailjs.send('service_d8hjss7', 'template_pgep7qb',emailData, 'vi3KZCR2z3UWOLZrN')
        .then((result:any) => {
            toast.success(result.text);
        }, (error:any) => {
            toast.error(error.text);
        });
        console.log(emailData);
      };
    return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
        <FormProvider {...methods}>
        <form className="space-y-5" onSubmit={submitHandler(onSubmit)}>
        <GWInput label="name" name="name" type='text'/>
        <GWInput label="email" name="email" type='email'/>
        <GWTextarea
        name='message'
        className="max-w-lg"
        label="Description"/>
        <Button color="primary" className='w-full my-2' size="lg" type="submit">
            Send Email
        </Button>
        </form>
        </FormProvider>
      </Card>
      <Toaster/>
    </div>
    );
};

export default ContactUs;
