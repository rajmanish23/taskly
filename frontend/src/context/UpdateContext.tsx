/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useState } from "react";

export type UpdateContextType = {
  updateState: number;
  triggerUpdate: () => void;
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
        updateState: updateCounterState,
        triggerUpdate: incrementUpdate,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
