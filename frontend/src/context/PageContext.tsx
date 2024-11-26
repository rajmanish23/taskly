/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useState } from "react";

export type PageContextType = {
  previousPage: string,
  setPreviousPage: (currentPageVal: string) => void
}

export const PageContext = createContext<PageContextType | null>(null);

export const PageContextProvider = ({children}: PropsWithChildren) => {
  const [previousPageState, setPreviousPageState] = useState("/")
  
  const setPreviousPage = (currentPageVal: string) => {
    setPreviousPageState(currentPageVal);
  };

  return (
    <PageContext.Provider value={{
      previousPage: previousPageState,
      setPreviousPage
    }}>
      {children}
    </PageContext.Provider>
  )
}