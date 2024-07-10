"use client";

import { getCachedNewsDataFromNaver } from "../actions";
import NewsSearchForm from "./news-search-form";
import NewsSearchResult from "./news-search-result";
import NewsSummaryWithAi from "./news-summary-with-ai";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

const News = ({ bookmarks }: { bookmarks: string[] }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [newsList, setNewsList] = useState<NewsResponse | null>(null);

  const action = async (keyword: string) => {
    const response = await getCachedNewsDataFromNaver(keyword);
    setNewsList(response);
  };

  useEffect(() => {
    if (keyword) {
      action(keyword);
    }
  }, [keyword]);

  return (
    <ScrollArea className="h-full">
      <NewsSearchForm />
      <NewsSummaryWithAi newsList={newsList} />
      <NewsSearchResult newsList={newsList} bookmarks={bookmarks} />
      <ScrollBar />
    </ScrollArea>
  );
};

export default News;
