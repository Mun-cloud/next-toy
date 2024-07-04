"use client";

import { Prisma } from "@prisma/client";
import CommentItemMoreBtn from "./comment-item-more-btn";
import { dateFormatter } from "@/lib/utils";
import { useState } from "react";
import PostCommentEditForm from "./post-comment-edit-form";
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

interface PostCommentItemProps {
  comment: CommentType;
  isOwner: boolean;
}
const PostCommentItem = ({ comment, isOwner }: PostCommentItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [iswrite, setIswrite] = useState(false);
  const onEditToggle = () => {
    setIsEdit((prev) => !prev);
  };
  const onAddCocommentClick = () => {
    setIswrite(true);
  };
  const onAddCocommentClose = () => {
    setIswrite(false);
  };
  return (
    <>
      {isEdit ? (
        <PostCommentEditForm comment={comment} onEditToggle={onEditToggle} />
      ) : (
        <div className="flex justify-between items-center px-4 relative h-[55px]">
          <div className="flex flex-col gap-px break-all">
            <span>{comment.content}</span>
            <span className="text-[12px] text-secondary/70">
              {comment.author.name} - {dateFormatter(comment.createdAt)}
            </span>
          </div>
          <CommentItemMoreBtn
            onAddCocommentClick={onAddCocommentClick}
            onEditToggle={onEditToggle}
            commentId={comment.id}
            isOwner={isOwner}
          />
        </div>
      )}
      {iswrite && (
        <AddCocomentForm onClose={onAddCocommentClose} commentId={comment.id} />
      )}
    </>
  );
};

export default PostCommentItem;
