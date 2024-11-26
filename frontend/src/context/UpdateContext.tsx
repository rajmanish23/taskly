/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useState } from "react";

export type UpdateContextType = {
  updateCounter: number;
  incrementUpdate: () => void;
};

export const UpdateContext = createContext<UpdateContextType | null>(null);

export const UpdateContextProvider = ({ children }: PropsWithChildren) => {
  const [updateCounterState, setUpdateCounterState] = useState(0);

  const incrementUpdate = () => {
    setUpdateCounterState((prev) => prev + 1);
  };

  return (
    <UpdateContext.Provider
      value={{
        updateCounter: updateCounterState,
        incrementUpdate,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
