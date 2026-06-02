import { links } from "@/config/links";

export default function ClientLoginButton() {
  return (
    <a
      href={links.clientLogin}
      className="fixed right-3 top-4 z-[900] inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/35 bg-zinc-950/72 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.16)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/45 hover:bg-violet-500/16 hover:shadow-[0_0_36px_rgba(168,85,247,0.18)] sm:right-5 sm:top-5 sm:px-5"
    >
      Client Login
    </a>
  );
}
