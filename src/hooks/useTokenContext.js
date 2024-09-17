import { useContext } from "react";
import { TokenContext } from "@/contexts/TokenProvider";

export const useTokenContext = () => {
    const context = useContext(TokenContext);

    if (!context) throw new Error("Some thing wrong with the useTokenContext");
    return context;
}