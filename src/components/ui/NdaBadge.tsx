import React from "react";

interface NdaBadgeProps {
  label?: string;
  className?: string;
}

export function NdaBadge({ label = "NDA", className = "" }: NdaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 ${className}`}
      title="Confidential client work - details protected by Non-Disclosure Agreement"
    >
      <span className="icon-[lucide--lock] size-3.5 inline-block shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
