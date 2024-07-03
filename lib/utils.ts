import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(
  date: string | Date,
  option?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(
    "ko-KR",
    option ? option : { dateStyle: "short" }
  ).format(new Date(date));
}
