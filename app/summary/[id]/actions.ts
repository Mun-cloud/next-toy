"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
  content: z.string().min(1).max(5000),
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
  content: z.string().min(1).max(5000),
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

export const deleteComment = async (formData: FormData) => {
  const id = Number(formData.get("commentId"));

  const result = await db.comment.delete({
    where: {
      id,
    },
    select: { id: true },
  });

  revalidateTag("comments");
  return result;
};

const commentEditSchema = z.object({
  id: z.coerce.number(),
  content: z.string().min(1).max(5000),
});

export const editComment = async (_: any, formData: FormData) => {
  const data = {
    id: formData.get("id"),
    content: formData.get("content"),
  };
  const result = commentEditSchema.safeParse(data);

  if (result.success) {
    await db.comment.update({
      where: {
        id: result.data.id,
      },
      data: {
        content: result.data.content,
      },
    });

    revalidateTag("comments");
  } else {
    return result.error.flatten().fieldErrors;
  }
};

export const deleteCocomment = async (formData: FormData) => {
  const id = Number(formData.get("cocommentId"));

  const result = await db.coComment.delete({
    where: {
      id,
    },
    select: { id: true },
  });

  revalidateTag("comments");
  return result;
};

const cocommentEditSchema = z.object({
  id: z.coerce.number(),
  content: z.string().min(1).max(5000),
});
export const editCocomment = async (_: any, formData: FormData) => {
  const data = {
    id: formData.get("id"),
    content: formData.get("content"),
  };

  const result = cocommentEditSchema.safeParse(data);

  if (result.success) {
    await db.coComment.update({
      where: {
        id: result.data.id,
      },
      data: {
        content: result.data.content,
      },
    });

    revalidateTag("comments");
  } else {
    return result.error.flatten().fieldErrors;
  }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function summaryWithGemini(_: any, formData: FormData) {
  const postId = Number(formData.get("postId"));

  const post = await db.post.findFirst({
    where: { id: postId },
    select: { content: true },
  });

  if (post?.content) {
    try {
      let propt =
        "You are an expert at summarizing posts. Summarize what I am sending in simple and easy for everyone to see in Korean. please summarize the input. ";

      const result = await model.generateContent(propt + post.content);
      const text = result.response.text();
      const session = await getSession();
      await db.comment.create({
        data: {
          postId,
          content: text,
          authorId: session.id!,
        },
      });
      revalidateTag("comments");
    } catch (error) {
      console.error(`Error analyzing text: ${error}`);
    }
  }
}
