"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const PostItemMoreBtn = ({ isOwner, id }: { isOwner: boolean; id: number }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <EllipsisVerticalIcon className="size-[25px] hover:bg-secondary rounded-full hover:text-primary transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOwner && (
          <DropdownMenuItem>
            <Link href={`/summary/${id}/edit`}>수정하기</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostItemMoreBtn;
