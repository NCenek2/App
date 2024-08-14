import { CardContext, UseCardContextType } from "../contexts/CardContext";
import { useContext } from "react";

const useCard = () => {
  return useContext<UseCardContextType>(CardContext);
};

export default useCard;
