"use client";

import { useRef } from "react";

export default function SidebarResizable({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const startX = e.clientX;

    const currentWidth = parseFloat(
      getComputedStyle(container).getPropertyValue("--sidebar-width"),
    );

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX;

      const newWidth = Math.min(420, Math.max(180, currentWidth + deltaX));

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        container.style.setProperty("--sidebar-width", `${newWidth}px`);
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={
        {
          "--sidebar-width": "256px",
        } as React.CSSProperties
      }
    >
      {children}

      <div
        onMouseDown={handleMouseDown}
        className="
    group
    absolute
    right-0
    top-0
    z-50
    h-full
    w-2
    translate-x-1/2
    cursor-col-resize
  "
      >
        <div
          className="
      absolute
      left-1/2
      top-0
      h-full
      w-px
      -translate-x-1/2
      bg-primary
      opacity-0
      transition-opacity
      group-hover:opacity-60
    "
        />
      </div>
    </div>
  );
}
