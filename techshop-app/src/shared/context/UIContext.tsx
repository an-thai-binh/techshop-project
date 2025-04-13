'use client'

import React, { createContext, ReactNode, useContext, useReducer } from 'react'
import { initialState, UIReducer } from './UIReducer'
import { Action, State } from '@/shared/types/ui'

const UIContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(
  undefined,
)

export const useUIContext = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider')
  }
  return context
}

interface UIProviderProps {
  children: ReactNode
}
export const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(UIReducer, initialState)
  return <UIContext.Provider value={{ state, dispatch }}>{children}</UIContext.Provider>
}
