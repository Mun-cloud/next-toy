"use client";

import Button from "@/app/_components/Button";
import Checkbox from "@/app/_components/Checkbox";
import Input from "@/app/_components/Input";
import { useFormState } from "react-dom";
import { uploadArticle } from "../action";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { type Editor as ToastEditor } from "@toast-ui/react-editor";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const AddPost = () => {
  const [errors, action] = useFormState(uploadArticle, null);
  const editorRef = useRef<ToastEditor>(null);
  return (
    <form
      className="max-w-lg w-full px-[20px] flex flex-col gap-3"
      action={(formData) => {
        formData.set("content", editorRef.current?.getInstance().getMarkdown());
        action(formData);
      }}
    >
      <Input label="title" name="title" />
      <div>
        <div className="text-[20px]">content</div>
        <div className="bg-secondary h-full">
          <Editor name="content" editorRef={editorRef} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-[20px] w-[120px]">published</div>
        <Checkbox name="published" />
      </div>
      <Button>Publish</Button>
    </form>
  );
};

export default AddPost;
