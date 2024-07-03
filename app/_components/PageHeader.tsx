import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftCircleIcon as ArrowLeftCircleIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  href: string;
}

const PageHeader = ({ href, title }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-center h-[50px] border-b px-5 relative">
      <Link
        className="absolute top-1/2 -translate-y-1/2 left-5 group"
        href={href}
      >
        <ArrowLeftCircleIconSolid className="size-[30px] group-hover:hidden block" />
        <ArrowLeftCircleIcon className="size-[30px] group-hover:block hidden" />
      </Link>
      {title}
    </div>
  );
};

export default PageHeader;
