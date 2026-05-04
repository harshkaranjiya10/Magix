// File: src/hooks/use-media-query.ts
import { useState, useEffect } from "react"

/**
 * Custom hook to check if a given media query matches.
 * @param query - The CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean - true if the query matches, false otherwise
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    // Prevents SSR issues: window is undefined on the server
    if (typeof window !== "undefined") {
      return window.matchMedia(q).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    // Update state when the media query status changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // For older browsers, addListener/removeListener is needed
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener)
    } else {
      mediaQueryList.addListener(listener)
    }

    // Initial check
    setMatches(mediaQueryList.matches)

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener)
      } else {
        mediaQueryList.removeListener(listener)
      }
    }
  }, [query])

  return matches
}
