"use client"

import { createContext, useState } from "react";

export const TokenContext = createContext();

export default function TokenProvider({ children, tokens }) {
    const [allTokens, setTokens] = useState(tokens);

    return (
        <TokenContext.Provider value={{ allTokens, setTokens }}>
            { children }
        </TokenContext.Provider>
    )
}