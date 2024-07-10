import PageHeader from "@/app/_components/PageHeader";
import { notFound } from "next/navigation";
import { getPosts } from "./actions";
import AddCommentForm from "./_components/add-comment-form";
import PostComments from "./_components/post-comments";
import { dateFormatter } from "@/lib/utils";
import { getSession } from "@/lib/session";
import SummaryWithGemini from "./_components/summary-with-gemini";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
const Viewer = dynamic(() => import("@/components/viewer"), {
  ssr: false,
  loading: () => <Loader2 className="animate-spin" />,
});

const SummaryDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const userId = (await getSession()).id!;

  const post = await getPosts(id);
  if (!post) {
    return notFound();
  }

  return (
    <>
      <PageHeader href="/summary" title={post.title} />
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col pt-4 pb-20 px-5 gap-5 min-h-[calc(100vh-80px-100px)] relative text-secondary bg-secondary">
          <div className="text-primary/50">
            {dateFormatter(post.createdAt, { dateStyle: "full" })}
          </div>
          <Suspense>
            <Viewer value={post.content} />
          </Suspense>
          <SummaryWithGemini postId={id} />
        </div>
        <div className="border-t min-h-[100px]">
          <AddCommentForm />
          <PostComments postId={id} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default SummaryDetailPage;
