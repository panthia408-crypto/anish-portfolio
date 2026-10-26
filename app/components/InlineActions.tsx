"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    clearGlobalSearch?: () => void;
    closeCategory?: () => void;
    openCategory?: (category: string) => void;
  }
}

export default function InlineActions() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const action = target.closest<HTMLElement>("[data-action]");
      if (!action) {
        return;
      }

      if (action.dataset.action === "reset-work-search") {
        const searchInput = document.getElementById("work-search");
        if (searchInput instanceof HTMLInputElement) {
          searchInput.value = "";
          searchInput.dispatchEvent(new Event("input"));
        }
        return;
      }

      if (action.dataset.action === "clear-library-search") {
        window.clearGlobalSearch?.();
        return;
      }

      if (action.dataset.action === "open-library-category") {
        const category = action.dataset.category;
        if (category) {
          window.openCategory?.(category);
        }
        return;
      }

      if (action.dataset.action === "close-library-category") {
        window.closeCategory?.();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
