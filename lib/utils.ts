import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlToText(html: string | null | undefined): string {
  let text = html?.replace(/<[^>]*>/g, "") ?? "";

  const entities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&hellip;": "...",
    "&mdash;": "—",
    "&ndash;": "-",
  };

  Object.entries(entities).forEach(([entity, replacement]) => {
    text = text.replace(new RegExp(entity, "g"), replacement);
  });

  text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));

  text = text.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  text = text.replace(/\s+/g, " ").trim();

  return text;
}
