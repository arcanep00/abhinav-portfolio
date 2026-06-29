import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Button({ children, href, variant = "primary", external, className, onClick }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition";
  const variants = {
    primary: "bg-emeraldSoft text-ink hover:bg-white",
    secondary: "border border-white/20 bg-white/[0.07] text-white hover:bg-white/15"
  };

  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
