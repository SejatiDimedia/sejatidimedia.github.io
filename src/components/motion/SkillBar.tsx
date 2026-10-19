"use client";

import React from "react";
import { m } from "motion/react";
import { useIsMounted } from "@/lib/useIsMounted";

interface SkillBarProps {
  level: number; // 0-100
  className?: string;
}

export function SkillBar({ level, className }: SkillBarProps) {
  const mounted = useIsMounted();
  const clampedLevel = Math.min(Math.max(level, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedLevel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clampedLevel}% proficiency`}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-border/40 ${className || ""}`}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${clampedLevel}%` }}
      >
        {mounted ? (
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            style={{ transformOrigin: "left" }}
            className="h-full w-full rounded-full bg-cobalt"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-cobalt" />
        )}
      </div>
    </div>
  );
}
