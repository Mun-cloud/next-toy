"use client";

import { Prisma } from "@prisma/client";
import CommentItemMoreBtn from "./comment-item-more-btn";
import { dateFormatter } from "@/lib/utils";
import { useState } from "react";
import AddCocomentForm from "./add-cocoment-form";

type CommentType = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: { name: true; id: true };
    };
    children: {
      include: { author: { select: { name: true; id: true } } };
    };
  };
}>;

const PostCommentItem = ({ comment }: { comment: CommentType }) => {
  const [iswrite, setIswrite] = useState(false);
  const onAddCocommentClick = () => {
    setIswrite(true);
  };
  const onAddCocommentClose = () => {
    setIswrite(false);
  };
  return (
    <>
      <div className="flex justify-between items-center px-4 relative h-[55px]">
        <div className="flex flex-col gap-px break-all">
          <span>{comment.content}</span>
          <span className="text-[12px] text-secondary/70">
            {comment.author.name} - {dateFormatter(comment.createdAt)}
          </span>
        </div>
        <CommentItemMoreBtn onClick={onAddCocommentClick} />
      </div>
      {iswrite && (
        <AddCocomentForm onClose={onAddCocommentClose} commentId={comment.id} />
      )}
    </>
  );
};

export default PostCommentItem;
