import React from "react";

export default function LegalParagraph({ title, children }: {title: string, children: React.ReactNode}) {
  return (
    <div className="my-4">
      <h3 className="font-bold text-xl text-secondary dark:text-primary">{title}</h3>
      {children}
    </div>
  );
}
