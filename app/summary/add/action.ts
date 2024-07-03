"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string({ required_error: "제목을 입력해주세요." }),
  content: z.string().min(1, "1자 이상 입력해주시기 바랍니다."),
  published: z.boolean(),
});

export async function uploadArticle(_: any, formdata: FormData) {
  const data = {
    title: formdata.get("title"),
    content: formdata.get("content"),
    published: formdata.get("published") ? true : false,
  };
  const result = schema.safeParse(data);

  if (result.success) {
    const session = await getSession();
    if (session.id) {
      const article = await db.post.create({
        data: {
          title: result.data.title,
          content: result.data.content,
          published: result.data.published,
          author: {
            connect: { id: session.id },
          },
        },
        select: {
          id: true,
        },
      });

      redirect(`/summary/${article.id}`);
    }
  } else {
    return result.error.flatten().fieldErrors;
  }
}
