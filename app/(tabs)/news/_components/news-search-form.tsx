import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import Link from "next/link";
import { useRef, useState } from "react";

const NewsSearchForm = () => {
  const [query, setQuery] = useState("");
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="flex justify-center items-center gap-3 px-3 py-10 border-b">
      <Input
        label="news keyword"
        name="keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            linkRef.current?.click();
          }
        }}
      />
      <Link href={{ query: { keyword: query } }} ref={linkRef}>
        <Button className="w-fit mx-0">Search</Button>
      </Link>
    </div>
  );
};

export default NewsSearchForm;
