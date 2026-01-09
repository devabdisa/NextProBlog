import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-muted/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80" />
      
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className: "bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all",
          })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md mx-auto p-4 relative z-10 animate-in fade-in zoom-in-95 duration-500">
         {children}
      </div>
    </div>
  );
}
