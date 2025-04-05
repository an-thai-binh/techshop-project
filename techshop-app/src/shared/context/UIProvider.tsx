'use client';

import { ReactNode } from "react";
import { UIProvider } from "./UIContext";

interface  ContextProviderProps {
    children: ReactNode;
}

export function ContextProvider({children} : ContextProviderProps) {
    return <UIProvider>{children}</UIProvider>;
}