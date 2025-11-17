import { cn } from "@/lib/utils";

export default function LiquidGlass({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-[5px] bg-[#63636333] bg-blend-hard-light backdrop-blur-[24px] border-[2px] border-[#ffffff0a]",
        className
      )}
    >
      {children}
    </div>
  );
}
