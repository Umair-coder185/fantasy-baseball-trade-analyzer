import React from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-navy tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-text max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
