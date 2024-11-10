import { useEffect } from "react";

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title + " - " + import.meta.env.VITE_SITE_DEAULT_TITLE;
  }, [title]);
}
