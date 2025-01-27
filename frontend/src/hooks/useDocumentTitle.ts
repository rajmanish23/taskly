import { useEffect } from "react";
import { SITE_DEAULT_TITLE } from "../constants";

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title + " - " + SITE_DEAULT_TITLE;
  }, [title]);
}
