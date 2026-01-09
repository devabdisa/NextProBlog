"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "../ui/button";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
// import { useTransition } from "react";

export function Navbar() {
  // const [isPending, startTransition] = useTransition();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  
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
            {/* Show Create only if authenticated? Assuming yes or public */}
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
          {isLoading ? (
            <div className="w-20 h-9 rounded bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <>
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
            </>
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
