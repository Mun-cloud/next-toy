import { getSession } from "@/lib/session";

import Link from "next/link";

import AuthBtns from "@/app/_components/AuthBtns";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Suspense } from "react";
import PostsLoading from "./loading";
import PostsList from "./_components/PostsList";

const SummaryPage = async () => {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-[100vh] relative">
      <div className="h-[60px] border-b flex items-center justify-between px-8">
        <div className="text-[22px] font-bold">Summary</div>
        <AuthBtns isLogin={!!session.id} />
      </div>
      <Suspense fallback={<PostsLoading />}>
        <PostsList />
      </Suspense>
      <Link
        className="fixed right-5 bottom-20 size-8 rounded-full bg-white text-primary flex items-center justify-center z-10"
        href="/summary/add"
      >
        <PlusIcon />
      </Link>
    </div>
  );
};

export default SummaryPage;
