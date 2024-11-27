/* eslint-disable prettier/prettier */
"use client"
import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the editor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});


interface TextEditorProps{
    content:string,
    setContent:React.Dispatch<React.SetStateAction<string>>
}
interface TextEditorProps{
    content:string,
    setContent:React.Dispatch<React.SetStateAction<string>>
}

const TextEditor = ({content,setContent}:TextEditorProps) => {
    const editor = useRef(null);

    return (
        <JoditEditor
        ref={editor}
        value={content}
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
    />
    );
};

export default TextEditor;