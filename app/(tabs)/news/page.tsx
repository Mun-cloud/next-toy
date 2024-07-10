import { getCachedBookmark } from "./actions";
import News from "./_components/news";

const NewsPage = async () => {
  const bookmarks = await getCachedBookmark();

  return (
    <>
      <News bookmarks={bookmarks.map(({ link }) => link)} />
    </>
  );
};

export default NewsPage;
