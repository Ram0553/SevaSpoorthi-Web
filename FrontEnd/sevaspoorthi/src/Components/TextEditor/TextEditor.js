import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import './TextEditor.css'
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
function TextEditor({editorState,setEditorState}){

    function onEditorStateChange(str){
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        setEditorState(str);
    }

    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );
}
export default TextEditor;