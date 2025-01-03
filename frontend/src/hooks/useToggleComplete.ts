import { useContext } from "react";
import { UpdateContext, UpdateContextType } from "../context/UpdateContext";

export default useToggleComplete = () => {
  const { triggerUpdate } = useContext(UpdateContext) as UpdateContextType;
  
}
