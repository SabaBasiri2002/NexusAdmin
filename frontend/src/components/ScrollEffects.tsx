"use client";

import { useEffect } from "react";

const motionSelector = [
  ".dashboard-content > main > section",
  ".dashboard-content > main > article",
  ".dashboard-content > main > aside",
  ".dashboard-content > main > div",
  ".dashboard-content aside > div",
  ".dashboard-content tbody tr",
  "[data-scroll-reveal]",
].join(", ");

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function ScrollEffects() {
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrubbed = new Map<HTMLElement, Animation>();
    const parallax = new Map<HTMLElement, Animation>();
    let frame = 0;
    let scrollRoot = document.scrollingElement;

    function findScrollRoot() {
      let parent = document.querySelector(".dashboard-content")?.parentElement;

      while (parent) {
        const overflow = getComputedStyle(parent).overflowY;
        if (/auto|scroll/.test(overflow) && parent.scrollHeight > parent.clientHeight + 1) {
          scrollRoot = parent;
          return;
        }
        parent = parent.parentElement;
      }

      scrollRoot = document.scrollingElement;
    }

    function register() {
      findScrollRoot();
      if (reducedMotion.matches) return;

      document.querySelectorAll<HTMLElement>(motionSelector).forEach((element) => {
        if (scrubbed.has(element)) return;

        const row = element.matches("tr");
        const card = element.dataset.scrollReveal === "card";
        const animation = element.animate(
          [
            {
              transform: `translate3d(0, ${row ? 8 : card ? 14 : 12}px, 0)`,
            },
            { transform: "translate3d(0, 0, 0)" },
          ],
          { duration: 1000, fill: "both" },
        );

        animation.pause();
        scrubbed.set(element, animation);
      });

      document.querySelectorAll<HTMLElement>("[data-scroll-parallax]").forEach((element) => {
        if (parallax.has(element)) return;

        const distance = Number(element.dataset.scrollParallax) * 1.2;
        if (!Number.isFinite(distance)) return;

        const animation = element.animate(
          [
            { transform: `translate3d(0, ${-distance}px, 0)` },
            { transform: `translate3d(0, ${distance}px, 0)` },
          ],
          { duration: 1000, fill: "both" },
        );

        animation.pause();
        parallax.set(element, animation);
      });
    }

    function updateScroll() {
      frame = 0;
      const viewportHeight = window.innerHeight;

      if (progress) {
        const root = scrollRoot;
        const distance = root ? root.scrollHeight - root.clientHeight : 0;
        const ratio = distance > 0 && root ? root.scrollTop / distance : 0;
        progress.style.transform = `scaleX(${clamp(ratio)})`;
        progress.dataset.scrollable = distance > 0 ? "true" : "false";
      }

      for (const [element, animation] of scrubbed) {
        if (!element.isConnected) {
          animation.cancel();
          scrubbed.delete(element);
          continue;
        }

        const rect = element.getBoundingClientRect();
        const siblings = Array.from(element.parentElement?.children ?? []);
        const stagger = element.dataset.scrollReveal === "card"
          ? (siblings.indexOf(element) % 4) * 16
          : 0;
        const start = viewportHeight * 0.98 - stagger;
        const end = viewportHeight * 0.78 - stagger;
        animation.currentTime = (
          rect.bottom <= viewportHeight + 8
            ? 1
            : clamp((start - rect.top) / (start - end))
        ) * 1000;
      }

      for (const [element, animation] of parallax) {
        if (!element.isConnected) {
          animation.cancel();
          parallax.delete(element);
          continue;
        }

        const anchor = element.parentElement?.getBoundingClientRect();
        if (!anchor) continue;

        const center = anchor.top + anchor.height / 2;
        const range = (viewportHeight + anchor.height) / 2;
        animation.currentTime = clamp(
          ((viewportHeight / 2 - center) / range + 1) / 2,
        ) * 1000;
      }
    }

    function scheduleScroll() {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    }

    function onMotionChange() {
      if (reducedMotion.matches) {
        for (const animation of scrubbed.values()) animation.cancel();
        for (const animation of parallax.values()) animation.cancel();
        scrubbed.clear();
        parallax.clear();
      } else {
        register();
      }
      scheduleScroll();
    }

    const mutations = new MutationObserver(() => {
      register();
      scheduleScroll();
    });

    register();
    mutations.observe(document.body, { childList: true, subtree: true });
    reducedMotion.addEventListener("change", onMotionChange);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    document.addEventListener("scroll", scheduleScroll, { capture: true, passive: true });
    window.addEventListener("resize", scheduleScroll);
    scheduleScroll();

    return () => {
      mutations.disconnect();
      for (const animation of scrubbed.values()) animation.cancel();
      for (const animation of parallax.values()) animation.cancel();
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", scheduleScroll);
      document.removeEventListener("scroll", scheduleScroll, true);
      window.removeEventListener("resize", scheduleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className="scroll-progress" data-scroll-progress />;
}
