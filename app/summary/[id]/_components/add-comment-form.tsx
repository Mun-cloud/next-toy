"use client";

import { useFormState } from "react-dom";
import { addComment, getComments } from "../actions";
import { useParams } from "next/navigation";
import { useRef } from "react";

const AddCommentForm = () => {
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, action] = useFormState(addComment, null);

  return (
    <div className="px-4 py-2 space-y-1">
      <div className="">comment</div>
      <form
        className="flex justify-between items-center gap-6 h-14"
        action={(formData) => {
          action(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
      >
        <input
          type="hidden"
          className="hidden"
          name="postId"
          value={params.id}
        />
        <div className="border rounded-md grow h-full relative">
          <textarea
            className="w-full h-full bg-inherit resize-none"
            name="content"
          />
          {errors?.content && (
            <p className="text-red-500 text-[12px] absolute right-0 bottom-full mb-px">
              {errors.content}
            </p>
          )}
        </div>
        <button className="bg-secondary h-full text-primary px-4 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
