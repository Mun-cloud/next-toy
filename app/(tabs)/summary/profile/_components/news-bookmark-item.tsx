import { Prisma } from "@prisma/client";
import BookmarkMoreBtn from "./bookmark-more-btn";

interface NewsBookmarkItemProps {
  bookmark: Prisma.NewsBookmarkGetPayload<{
    select: {
      id: true;
      title: true;
      link: true;
      description: true;
      pubDate: true;
    };
  }>;
}

const NewsBookmarkItem = ({ bookmark }: NewsBookmarkItemProps) => {
  return (
    <div className="py-1 px-2 flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <div
          className="line-clamp-1 text-[14px]"
          dangerouslySetInnerHTML={{ __html: bookmark.title }}
        />
        <div
          className="line-clamp-2 text-[12px] text-gray-400"
          dangerouslySetInnerHTML={{ __html: bookmark.description }}
        />
      </div>
      <BookmarkMoreBtn bookmarkId={bookmark.id} />
    </div>
  );
};

export default NewsBookmarkItem;
