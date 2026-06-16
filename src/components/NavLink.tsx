"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        isActive
          ? "text-sm font-medium text-indigo-600 dark:text-indigo-400"
          : "text-sm text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
      }
    >
      {label}
    </Link>
  );
}
