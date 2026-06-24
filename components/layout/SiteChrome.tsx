"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Conditionally renders AppBar/Footer/FAB only on non-admin routes.
// Uses the "children as props" pattern so AppBar/Footer remain Server Components.
export function SiteChrome({
  appBar,
  footer,
  floatingActions,
  children,
}: {
  appBar: ReactNode;
  footer: ReactNode;
  floatingActions: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {appBar}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      {footer}
      {floatingActions}
    </>
  );
}
