"use client";

type NeonImageButtonProps = {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  className?: string;
  minWidthClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  successPulse?: boolean;
  defaultImage?: string;
  hoverImage?: string;
  successImage?: string;
};

export default function NeonImageButton({
  href,
  children,
  external = false,
  type = "button",
  className = "",
  minWidthClassName = "min-w-[140px]",
  disabled = false,
  loading = false,
  successPulse = false,
  defaultImage = "/images/btn-default.png",
  hoverImage = "/images/btn-hover.png",
  successImage,
}: NeonImageButtonProps) {
  const isDisabled = disabled || loading;
  const activeImage = successPulse && successImage ? successImage : hoverImage;

  const baseClass = `
    group relative inline-flex h-[54px] ${minWidthClassName}
    items-center justify-center overflow-hidden rounded-full
    px-6 text-sm font-semibold text-white no-underline
    select-none
    transition-all duration-300 ease-out
    ${
      isDisabled
        ? "cursor-not-allowed opacity-70"
        : "cursor-pointer hover:-translate-y-[2px] hover:scale-[1.02] active:translate-y-[1px] active:scale-[0.98]"
    }
    ${successPulse ? "animate-[successPulse_1.6s_ease-in-out_infinite]" : ""}
    ${className}
  `;

  const content = (
    <>
      <span
        className={`
          absolute inset-0 rounded-full transition-opacity duration-200
          ${
            successPulse
              ? "opacity-0"
              : isDisabled
              ? "opacity-100"
              : "opacity-100 group-hover:opacity-0"
          }
        `}
        style={{
          backgroundImage: `url('${defaultImage}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      <span
        className={`
          absolute inset-0 rounded-full transition-opacity duration-200
          ${
            successPulse
              ? "opacity-100"
              : isDisabled
              ? "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          }
        `}
        style={{
          backgroundImage: `url('${activeImage}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      {loading && (
        <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-y-0 left-[-35%] w-[35%] animate-[buttonShimmer_1.1s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      )}

      <span
        className={`
          relative z-10 inline-flex items-center gap-2 whitespace-nowrap
          transition-all duration-300
          ${
            isDisabled || successPulse
              ? ""
              : "group-hover:-translate-y-[1px] group-hover:scale-[1.04]"
          }
        `}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
        )}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={isDisabled ? undefined : href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-disabled={isDisabled}
        className={baseClass}
        onClick={(e) => {
          if (isDisabled) e.preventDefault();
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={baseClass} disabled={isDisabled}>
      {content}
    </button>
  );
}