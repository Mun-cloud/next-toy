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
