"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import { Editor as ToastEditor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import { RefObject } from "react";

interface EditorProps {
  editorRef?: RefObject<ToastEditor>;
  value?: string | null;
  name?: string;
}

const Editor = ({ editorRef, value, name }: EditorProps) => {
  return (
    <>
      <ToastEditor
        ref={editorRef}
        initialValue={value || " "}
        linkAttributes={{ rel: "noreferrer noopener", target: "_blank" }}
        plugins={[colorSyntax]}
        language="ko-KR"
        height="500px"
        initialEditType="wysiwyg"
        name={name}
        theme="light"
      />
    </>
  );
};

export default Editor;
