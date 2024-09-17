"use client"

import { createContext, useState } from "react";

export const ToggleContext = createContext();

export default function ToggleProvider({ children, info }) {
    const [toggleInfo, setToggleInfo] = useState(info);

    return (
        <ToggleContext.Provider value={{ toggleInfo, setToggleInfo }}>
            { children }
        </ToggleContext.Provider>
    )
}