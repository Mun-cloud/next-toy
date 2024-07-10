import { cachedAiResponse } from "../actions";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

interface NewsSummaryWithAiProps {
  newsList: NewsResponse | null;
}

const NewsSummaryWithAi = ({ newsList }: NewsSummaryWithAiProps) => {
  const keyword = useSearchParams().get("keyword");
  const [isOpen, setIsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>("");

  const isResizingRef = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const onClick = async () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      resetHeight();
      if (!newsList || aiResponse) return;
      const response = await cachedAiResponse(newsList, keyword);
      if (response) {
        setAiResponse(response);
      }
    } else {
      closedHeight();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newHeight = event.clientY - 115;
    if (boxRef.current) {
      boxRef.current.style.height = `${newHeight}px`;
      boxRef.current.style.setProperty("height", `${newHeight}px`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetHeight = () => {
    if (!boxRef.current) return;
    setIsResetting(true);
    boxRef.current.style.height = `150px`;
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };

  const closedHeight = () => {
    if (!boxRef.current) return;
    setIsResetting(true);
    boxRef.current.style.height = `33px`;
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };

  useEffect(() => {
    setAiResponse(null);
    setIsOpen(false);
    closedHeight();
  }, [keyword]);

  return (
    <div
      className={cn(
        "px-4 py-1 border-b relative group/ai flex flex-col",
        isResetting ? "transition-all ease-in-out duration-300" : ""
      )}
      ref={boxRef}
    >
      <button onClick={onClick} className="flex">
        AI요약 보기{" "}
        <ChevronDownIcon
          data-open={isOpen ? "open" : "close"}
          className="data-[open=open]:-rotate-180 transition-transform duration-100"
        />
      </button>
      {isOpen && (
        <ScrollArea className="h-full">
          <Markdown className="text-[14px] leading-6">
            {!newsList ? "please search first" : aiResponse || "Loading..."}
          </Markdown>
          <ScrollBar />
        </ScrollArea>
      )}
      <div
        onMouseDown={handleMouseDown}
        onClick={resetHeight}
        className="opacity-0 absolute bottom-0 left-0 w-full h-1 bg-secondary/40 cursor-ns-resize transition group-hover/ai:opacity-100"
      />
    </div>
  );
};

export default NewsSummaryWithAi;
