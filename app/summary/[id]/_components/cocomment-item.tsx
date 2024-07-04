"use client";

import { dateFormatter } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import CocommentTimeMoreBtn from "./cocomment-time-more-btn";
import EditCocommentForm from "./edit-cocomment-form";

type CocommentType = Prisma.CoCommentGetPayload<{
  include: { author: { select: { id: true; name: true } } };
}>;

interface CocommentItemProps {
  cocomment: CocommentType;
  isOwner: boolean;
}
const CocommentItem = ({ cocomment, isOwner }: CocommentItemProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const editToggle = () => setIsEdit((prev) => !prev);

  return (
    <>
      {isEdit ? (
        <EditCocommentForm cocomment={cocomment} onEditToggle={editToggle} />
      ) : (
        <div className="flex justify-between py-1 pl-16 pr-4 min-h-[55px]">
          <div className="flex flex-col gap-px break-all">
            <span>{cocomment.content}</span>
            <span className="text-[12px] text-secondary/70">
              {cocomment.author.name} - {dateFormatter(cocomment.createdAt)}
            </span>
          </div>
          {isOwner && (
            <CocommentTimeMoreBtn
              editToggle={editToggle}
              cocommentId={cocomment.id}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CocommentItem;
