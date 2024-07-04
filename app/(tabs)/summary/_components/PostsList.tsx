import db from "@/lib/db";
import Link from "next/link";
import PostItemMoreBtn from "./PostItemMoreBtn";
import { getSession } from "@/lib/session";

const getPosts = async () => {
  return await db.post.findMany({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const PostsList = async () => {
  const posts = await getPosts();
  const session = await getSession();
  return (
    <div className="overflow-y-auto h-[calc(100vh-60px-60px)]">
      {posts.map((post) => (
        <Link
          className="border-b py-3 px-5 flex justify-between items-center"
          href={`/summary/${post.id}`}
          key={post.id}
        >
          <div className="flex flex-col">
            <span>{post.title}</span>
            <span className="text-secondary/70 text-[12px]">
              {post.author.email}
            </span>
          </div>
          <PostItemMoreBtn
            isOwner={session.id === post.author.id}
            id={post.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostsList;
