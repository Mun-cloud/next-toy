import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { deletePost } from "../actions";
import { EllipsisVerticalIcon } from "lucide-react";

const PostMoreBtn = ({ postId }: { postId: number }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full hover:bg-gray-800 transition-colors">
        <EllipsisVerticalIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            className="block w-full h-full"
            href={`/summary/${postId}/edit`}
          >
            edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action={deletePost}>
            <button name="postId" value={postId}>
              delete
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMoreBtn;
