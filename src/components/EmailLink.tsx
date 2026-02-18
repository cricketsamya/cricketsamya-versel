"use client";

import { useMemo } from "react";

type EmailLinkProps = {
  user: string;
  domain: string;
  label?: string;
  className?: string;
};

export function EmailLink({ user, domain, label = "Email", className }: EmailLinkProps) {
  const email = useMemo(() => `${user}@${domain}`, [user, domain]);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    >
      {label}
    </button>
  );
}

