import { Suspense } from "react";

import PortalPasswordSetupWorkspace from "@/components/portal/portal-password-setup-workspace";

export const dynamic = "force-dynamic";

export default function PortalSetupPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-[92rem] gap-4">
        <Suspense
          fallback={
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-sm font-bold text-zinc-300">
              Loading workspace setup...
            </div>
          }
        >
          <PortalPasswordSetupWorkspace />
        </Suspense>
      </section>
    </main>
  );
}
