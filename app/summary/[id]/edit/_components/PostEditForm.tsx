"use client";

import { useFormState } from "react-dom";
import { editPost } from "../actions";
import Checkbox from "@/app/_components/Checkbox";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { type Editor as ToastEditor } from "@toast-ui/react-editor";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => <Loader2 className="animate-spin" />,
});
interface PostEditFormProps {
  post: {
    id: number;
    title: string;
    content: string | null;
    published: boolean;
    authorId: number;
    author: {
      id: number;
      email: string;
      name: string | null;
    };
  };
}

const PostEditForm = ({ post }: PostEditFormProps) => {
  const [errors, action] = useFormState(editPost, null);
  const editorRef = useRef<ToastEditor>(null);
  return (
    <form
      className="flex flex-col justify-between grow"
      action={(formData) => {
        formData.set("content", editorRef.current?.getInstance().getMarkdown());
        action(formData);
      }}
    >
      <input type="hidden" name="id" defaultValue={post.id} />
      <div className="">
        <div className="flex flex-col gap-8 ">
          <div className="border rounded-md px-2 relative">
            <input
              type="text"
              defaultValue={post.title}
              name="title"
              className="bg-inherit text-[22px] font-bold w-full"
            />
            {errors?.title && (
              <div className="absolute top-full right-0 text-red-500 pt-0.5">
                {errors.title}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="">contents</div>
            <div className="relative bg-secondary">
              <Editor editorRef={editorRef} value={post.content} />
              {errors?.content && (
                <div className="absolute top-full right-0 text-red-500 pt-0.5">
                  {errors.content}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <div className="">published</div>
          <Checkbox defaultChecked={post.published} name="published" />
        </div>
      </div>
      <button className="h-10 bg-gray-800 rounded-md hover:bg-white hover:text-black transition-colors">
        Update
      </button>
    </form>
  );
};

export default PostEditForm;
