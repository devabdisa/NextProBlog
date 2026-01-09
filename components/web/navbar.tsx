"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "../ui/button";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              NP
              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-background" />
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">
              Next<span className="text-primary">Pro</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={buttonVariants({
                variant: "ghost",
                className: "text-muted-foreground hover:text-foreground",
              })}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({
                variant: "ghost",
                className: "text-muted-foreground hover:text-foreground",
              })}
            >
              Blog
            </Link>
            <Link
              href="/create"
              className={buttonVariants({
                variant: "ghost",
                className: "text-muted-foreground hover:text-foreground",
              })}
            >
              Create
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block mr-2 w-64">
            <SearchInput />
          </div>
          
          <div className="hidden md:flex items-center gap-2">
             {isLoading ? (
                <div className="w-20 h-9 rounded bg-muted animate-pulse" />
              ) : isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() =>
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success("Logged out successfully");
                          router.push("/");
                        },
                        onError: (error) => {
                          toast.error(error.error.message);
                        },
                      },
                    })
                  }
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/auth/sign-up" className={buttonVariants({ variant: "default" })}>
                    Get Started
                  </Link>
                  <Link
                    href="/auth/login"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Login
                  </Link>
                </>
              )}
          </div>
          
          <ThemeToggle />
          
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
           <div className="mb-4">
             <SearchInput />
           </div>
           
           <nav className="flex flex-col gap-2">
             <Link
               href="/"
               className="flex items-center p-2 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
               onClick={() => setIsMobileMenuOpen(false)}
             >
               Home
             </Link>
             <Link
               href="/blog"
               className="flex items-center p-2 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
             >
               Blog
             </Link>
             <Link
               href="/create"
               className="flex items-center p-2 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
             >
               Create
             </Link>
           </nav>
           
           <div className="h-px bg-border/50 my-2" />
           
           <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="w-full h-10 rounded bg-muted animate-pulse" />
              ) : isAuthenticated ? (
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success("Logged out successfully");
                          router.push("/");
                          setIsMobileMenuOpen(false);
                        },
                      },
                    });
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link 
                    href="/auth/sign-up" 
                    className={buttonVariants({ variant: "default", className: "w-full justify-center" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/auth/login"
                    className={buttonVariants({ variant: "secondary", className: "w-full justify-center" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
           </div>
        </div>
      )}
    </nav>
  );
}
