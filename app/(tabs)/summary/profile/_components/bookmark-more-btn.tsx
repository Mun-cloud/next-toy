import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { profileBookmarkDelete } from "../actions";

const BookmarkMoreBtn = ({ bookmarkId }: { bookmarkId: number }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full hover:bg-gray-800 transition-colors">
        <EllipsisVerticalIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <form action={profileBookmarkDelete}>
            <input type="hidden" name="id" value={bookmarkId} />
            <button className="size-4 w-full h-full">delete</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookmarkMoreBtn;
