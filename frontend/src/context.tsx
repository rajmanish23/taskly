/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";

export type PageContextType = {
  previousPage: string,
  setPreviousPage: (currentPageVal: string) => void
}

export const PageContext = React.createContext<PageContextType | null>(null);

const PageContextProvider = ({children}: React.PropsWithChildren) => {
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

export default PageContextProvider