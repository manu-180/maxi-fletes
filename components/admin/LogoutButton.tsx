"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    });
  }

  return (
    <button
      onClick={logout}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-(--slate-600) bg-(--bg-soft) ring-1 ring-(--line) hover:ring-(--brand-300) hover:text-(--brand-600) transition-all duration-300 disabled:opacity-50"
    >
      <SignOut size={13} weight="bold" />
      {isPending ? "Saliendo…" : "Cerrar sesión"}
    </button>
  );
}
