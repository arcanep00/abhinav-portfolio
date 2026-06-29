import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-emeraldSoft text-ink hover:bg-white border border-transparent",
  secondary:
    "border border-white/[0.14] bg-white/[0.08] text-white backdrop-blur hover:bg-white/[0.14]",
  ghost: "border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition duration-300",
    variants[variant],
    className
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
