import { Prisma } from "@prisma/client";
import React from "react";
import { useFormState } from "react-dom";
import { editComment } from "../actions";

interface PostCommentEditFormProps {
  comment: Prisma.CommentGetPayload<{
    include: {
      author: {
        select: { name: true; id: true };
      };
      children: {
        include: { author: { select: { name: true; id: true } } };
      };
    };
  }>;
  onEditToggle: () => void;
}

const PostCommentEditForm = ({
  comment,
  onEditToggle,
}: PostCommentEditFormProps) => {
  const [state, action] = useFormState(editComment, null);
  return (
    <form
      className="flex justify-between items-center px-4 relative gap-6 py-2"
      action={(formData) => {
        action(formData);
        onEditToggle();
      }}
    >
      <input type="hidden" name="id" value={comment.id} />
      <textarea
        className="bg-inherit resize-none border rounded-md grow h-14"
        defaultValue={comment.content}
        name="content"
      />
      <div className="h-14 flex flex-col gap-1">
        <button
          className="hover:bg-secondary hover:text-primary px-3 rounded-md grow text-[12px] transition-colors"
          type="button"
          onClick={onEditToggle}
        >
          Cancel
        </button>
        <button
          className="bg-secondary/70 hover:bg-secondary text-primary px-3 rounded-md grow text-[12px] transition-colors"
          type="submit"
        >
          Edit
        </button>
      </div>
    </form>
  );
};

export default PostCommentEditForm;
