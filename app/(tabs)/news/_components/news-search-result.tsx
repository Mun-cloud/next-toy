import { dateFormatter } from "@/lib/utils";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { addBookmark, deleteBookmark } from "../actions";

interface NewsSearchResultProps {
  newsList: NewsResponse | null;
  bookmarks: Array<string>;
}
const NewsSearchResult = ({ newsList, bookmarks }: NewsSearchResultProps) => {
  const onClick = (link: string) => {
    if (confirm("외부 페이지를 여시겠습니까?")) {
      window.open(link, "_blank");
    }
  };

  const onBookmarkClick = (news: NewsItem, isBookmarked: boolean) => {
    if (isBookmarked) {
      deleteBookmark(news.link);
    } else {
      addBookmark(news);
    }
  };
  return (
    <div className="pb-[60px]">
      {newsList?.items.map((news) => (
        <button
          key={news.link}
          className="h-20 border-b px-4 py-2"
          onClick={() => onClick(news.link)}
          type="button"
        >
          <div className="flex items-center justify-between">
            <div
              className="font-bold text-[14px] line-clamp-1"
              dangerouslySetInnerHTML={{ __html: news.title }}
            />
            <div className="flex items-center gap-1">
              <div className="text-[10px] shrink-0 text-secondary/70">
                {dateFormatter(news.pubDate)}
              </div>
              <button
                type="button"
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  const isBookmarked = bookmarks.includes(news.link);
                  onBookmarkClick(news, isBookmarked);
                }}
              >
                {bookmarks.includes(news.link) ? (
                  <BookmarkIconSolid className="size-3" />
                ) : (
                  <BookmarkIconOutline className="size-3" />
                )}
              </button>
            </div>
          </div>
          <div
            className="text-[12px] line-clamp-2 pt-1 [&_b]:text-[tomato]"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        </button>
      ))}
    </div>
  );
};

export default NewsSearchResult;
