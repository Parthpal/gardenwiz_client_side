/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { Card, CardBody } from '@nextui-org/card';
import React, { useRef, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import GWForm from '../Form/GWForm';
import GWInput from '../Form/GWInput';
import { Button } from '@nextui-org/button';
import JoditEditor from 'jodit-react';
import TextEditor from '../RichTextEditor/TextEditor';

const CreatePost = () => {
	const [content, setContent] = useState('');
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const submitHandler = methods.handleSubmit;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData={
      ...data,
      content
    }
    console.log(postData);
    
  }
    return (<>

        <Card>
          <CardBody>
            <FormProvider {...methods}>
                  <form onSubmit={submitHandler(onSubmit)}>
                  <GWInput className="max-w-xs" size='sm' label="Title" name="title"/>
                  <GWInput className="max-w-xs" label="category" name="category"/>
                  <TextEditor content={content} setContent={setContent} />
                  <Button size="lg" type="submit">
                      Post
                  </Button>
                  </form>
              </FormProvider>
              </CardBody>
          </Card>
        </>
    );
};

export default CreatePost;