import { useEffect, useRef } from "react";

/**
 * useScrollReveal — attaches an IntersectionObserver to a container element
 * and adds the `visible` class to any child with a scroll-reveal class
 * when it enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const container = ref.current;
    if (!container) return;

    const REVEAL_CLASSES = [
      ".scroll-reveal",
      ".scroll-reveal-left",
      ".scroll-reveal-right",
      ".scroll-reveal-scale",
    ];

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>(REVEAL_CLASSES.join(", ")),
    );

    if (targets.length === 0) return;

    if (prefersReduced) {
      for (const el of targets) el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of targets) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * useGlobalScrollReveal — call once in App to observe ALL scroll-reveal
 * elements on every page automatically.
 */
export function useGlobalScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const REVEAL_SELECTOR =
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale";

    type ObserverOrUndefined = IntersectionObserver | undefined;

    const applyToAll = (): ObserverOrUndefined => {
      if (prefersReduced) {
        for (const el of Array.from(
          document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
        )) {
          el.classList.add("visible");
        }
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
      );

      for (const el of Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      )) {
        observer.observe(el);
      }

      return observer;
    };

    let observer: ObserverOrUndefined = applyToAll();

    // Re-observe when page changes and new .scroll-reveal elements appear
    const mutationObserver = new MutationObserver(() => {
      if (observer) observer.disconnect();
      observer = applyToAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
