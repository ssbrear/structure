import { createContext, useContext } from "react";
import type { RefObject } from "react";

export const GraphContext = createContext<RefObject<SVGSVGElement | null> | null>(null);

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useSvg must be used within a GraphContext.Provider");
  }
  return context;
}
