import React from "react";

export const convertToValidHtmlId = (value: string | React.ReactElement | React.ReactNode): string => {
  const collect = (node: React.ReactNode): string => {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(collect).join(" ");
    if (React.isValidElement(node)) return collect((node as any).props?.children);
    return "";
  };

  const raw = typeof value === "string" ? value : collect(value);
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug;
};