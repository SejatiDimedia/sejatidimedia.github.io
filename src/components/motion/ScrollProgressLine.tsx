"use client";

import React from "react";
import { m, useScroll, useSpring } from "motion/react";

interface ScrollProgressLineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ScrollProgressLine({
  containerRef,
  className,
}: ScrollProgressLineProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className={`absolute left-3 md:left-4 top-3 bottom-6 w-0.5 bg-border/60 ${className || ""}`}>
      <m.div
        style={{ scaleY, transformOrigin: "top" }}
        className="w-full h-full bg-cobalt rounded-full"
      />
    </div>
  );
}
