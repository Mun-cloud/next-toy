"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const getArticle = async (id: number) => {
  return await db.post.findUnique({
    where: {
      id,
    },
  });
};

const commentSchema = z.object({
  postId: z.coerce.number(),
  content: z.string().min(1).max(1000),
});

export const addComment = async (_: any, formData: FormData) => {
  const data = {
    postId: formData.get("postId"),
    content: formData.get("content"),
  };

  const result = commentSchema.safeParse(data);

  if (result.success) {
    const session = await getSession();

    if (session.id) {
      await db.comment.create({
        data: {
          postId: result.data.postId,
          authorId: session.id,
          content: result.data.content,
        },
      });

      revalidateTag("comments");
    }
  } else {
    return result.error.flatten().fieldErrors;
  }
};

export const getComments = async (postId: number) => {
  return await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          name: true,
          id: true,
        },
      },
      children: {
        include: {
          author: {
            select: { name: true, id: true },
          },
        },
      },
    },
  });
};

const cocommentSchema = z.object({
  parentId: z.coerce.number(),
  content: z.string().min(1).max(1000),
});

export const addCocomment = async (formData: FormData) => {
  const data = {
    parentId: formData.get("parentId"),
    content: formData.get("content"),
  };
  const result = cocommentSchema.safeParse(data);

  if (result.success) {
    const session = await getSession();

    if (session.id) {
      await db.coComment.create({
        data: {
          content: result.data.content,
          authorId: session.id,
          parentId: result.data.parentId,
        },
      });
      revalidateTag("comments");
    }
  } else {
    return result.error.flatten().fieldErrors;
  }
};
