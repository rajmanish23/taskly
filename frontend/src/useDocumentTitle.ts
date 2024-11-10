import { useEffect, useRef } from "react";

export default function useDocumentTitle(title:string) {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title + " - " + defaultTitle.current
  }, [title])
}