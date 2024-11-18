/* eslint-disable prettier/prettier */
"use client"
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const TextEditor = ({placeholder}) => {
    const editor = useRef(null);
	const [content, setContent] = useState('');
    console.log(content);
    
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