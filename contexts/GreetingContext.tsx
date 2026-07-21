"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type GreetingContextValue = {
  childName: string;
};

const GreetingContext = createContext<GreetingContextValue | null>(null);

type GreetingProviderProps = {
  childName: string;
  children: ReactNode;
};

export function GreetingProvider({
  childName,
  children,
}: GreetingProviderProps) {
  return (
    <GreetingContext.Provider value={{ childName }}>
      {children}
    </GreetingContext.Provider>
  );
}

export function useGreeting() {
  const context = useContext(GreetingContext);

  if (!context) {
    throw new Error("useGreeting must be used inside GreetingProvider");
  }

  return context;
}
