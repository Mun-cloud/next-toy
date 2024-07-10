"use server";

import { geminiModel } from "@/lib/ai-model";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { NAVER_NEWS_URL } from "@/lib/constants";
import db from "@/lib/db";
import { getSession } from "@/lib/session";

const getNewsDataFromNaver = async (keyword: string) => {
  if (!!keyword) {
    const response = await fetch(
      `${NAVER_NEWS_URL}?query=${keyword}&display=100`,
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_API_ID!,
          "X-Naver-Client-Secret": process.env.NAVER_API_PW!,
        },
      }
    );
    const { items, ...rest } = (await response.json()) as NewsResponse;
    const filteredData = items.filter((item) =>
      item.link.includes("naver.com")
    );
    return { ...rest, items: filteredData };
  } else {
    return null;
  }
};

export const getCachedNewsDataFromNaver = (keyword: string) => {
  const response = nextCache(getNewsDataFromNaver, ["news-keyword-data"], {
    tags: [`news-keyword-${keyword}`],
  });
  return response(keyword);
};

const getNewsSummaryWithAI = async (
  newsData: NewsResponse,
  keyword: string
) => {
  try {
    const prompt =
      `다음은 ${newsData.items.length}개의 뉴스 기사 제목과 본문을 JSON.stringify()로 가공한 데이터 입니다.\n` +
      `사용자가 검색한 키워드는 ${keyword} 입니다. 키워드와 관련하여 각 기사의 핵심 내용을 파악하고, \n` +
      "전체적인 흐름과 주요 주제를 중심으로 종합적인 요약을 markdown으로 작성해주세요.\n";
    +"요약에는 다음 내용이 포함되어야 합니다.\n" +
      "1. **주요 내용:** 각 기사의 핵심 내용을 간략하게 요약하여 제시합니다.\n" +
      "2. **전체적인 흐름:** 키워드와 관련하여 전체적인 흐름을 설명합니다.\n" +
      "3. **시사점 및 추가 정보:** 기사 내용을 바탕으로 시사점, 추가 정보, 향후 전망 등을 제시합니다. (가능한 경우).\n" +
      "뉴스 데이터 : \n";
    const total = prompt + JSON.stringify(newsData);
    // const response = await vertexModel.generateContent({
    //   contents: [{ role: "user", parts: [{ text: total }] }],
    // });
    // const resultText = vertexResponseToText(response);
    const result = await geminiModel.generateContent(total);
    const resultText = result.response.text();

    return resultText;
  } catch (error) {
    console.error(error);
  }
};

export const cachedAiResponse = (
  newsData: NewsResponse,
  keyword: string | null
) => {
  if (!keyword) return null;
  const actionResponse = nextCache(getNewsSummaryWithAI, ["news-ai-response"], {
    tags: ["news-ai-response"],
  });
  return actionResponse(newsData, keyword);
};

export const addBookmark = async (news: NewsItem) => {
  try {
    const { originallink, ...newsData } = news;
    const session = await getSession();
    await db.newsBookmark.create({
      data: {
        ...newsData,
        userId: session.id!,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/news");
  } catch (error) {}
};

export const getBookmarks = async (userId: number) => {
  return await db.newsBookmark.findMany({
    where: {
      userId,
    },
    select: {
      link: true,
    },
  });
};

export const getCachedBookmark = async () => {
  const session = await getSession();
  const cachedData = nextCache(
    () => getBookmarks(session.id!),
    ["news-bookmarks"]
  );
  return cachedData();
};

export const deleteBookmark = async (link: string) => {
  try {
    const userId = (await getSession()).id!;
    await db.newsBookmark.delete({
      where: {
        link,
        userId,
      },
    });
    revalidatePath("/news");
  } catch (error) {}
};
