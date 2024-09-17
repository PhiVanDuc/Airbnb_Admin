import { useContext } from "react";
import { ToggleContext } from "@/contexts/ToggleProvider";

export const useToggleProvider = () => {
    const context = useContext(ToggleContext);

    if (!context) throw new Error("Some thing wrong with the useToggleProvider");
    return context;
}