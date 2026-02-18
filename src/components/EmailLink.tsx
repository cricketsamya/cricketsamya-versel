"use client";

import { useEffect, useMemo, useState } from "react";

type EmailLinkProps = {
  user: string;
  domain: string;
  label?: string;
  className?: string;
};

export function EmailLink({ user, domain, label = "Email", className }: EmailLinkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const email = useMemo(() => `${user}@${domain}`, [user, domain]);
  const href = mounted ? `mailto:${email}` : undefined;

  return (
    <a className={className} href={href} onClick={(e) => (!href ? e.preventDefault() : undefined)}>
      {label}
    </a>
  );
}

