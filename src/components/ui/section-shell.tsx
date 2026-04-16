type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="mt-16">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="text-3xl font-bold">{title}</h3>
        </div>

        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}