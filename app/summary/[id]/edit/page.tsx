import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import PostEditForm from "./_components/PostEditForm";
import Link from "next/link";
import PageHeader from "@/app/_components/PageHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const post = await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      author: true,
      published: true,
      title: true,
      content: true,
      authorId: true,
    },
  });

  if (!post) {
    redirect("/summary");
  }

  const user = await getSession();

  if (!user.id || user.id !== post.authorId) {
    redirect("/summary");
  }

  return (
    <>
      <PageHeader href={`/summary/${post.id}`} title="Update Post" />
      <div className="px-4 py-8 grow flex flex-col">
        <PostEditForm post={post} />
      </div>
    </>
  );
};

export default Page;
