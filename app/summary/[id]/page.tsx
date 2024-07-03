import PageHeader from "@/app/_components/PageHeader";
import { notFound } from "next/navigation";
import { getArticle, getComments } from "./actions";
import AddCommentForm from "./_components/add-comment-form";
import PostComments from "./_components/post-comments";
import { dateFormatter } from "@/lib/utils";

const SummaryDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const article = await getArticle(id);
  if (!article) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <PageHeader href="/summary" title={article.title} />
        <div className="flex flex-col pt-4 pb-20 px-5 gap-5 min-h-[calc(100vh-80px-100px)]">
          <div className="">
            {dateFormatter(article.createdAt, { dateStyle: "full" })}
          </div>
          <div className="leading-relaxed break-keep">{article.content}</div>
        </div>
      </div>
      <div className="border-t min-h-[100px]">
        <AddCommentForm />
        <PostComments postId={id} />
      </div>
    </div>
  );
};

export default SummaryDetailPage;
