"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "../ui/button";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useTransition } from "react";

export function Navbar() {
  // const [isPending, startTransition] = useTransition();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full flex items-center justify-between py-5">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Blog
          </Link>
          <Link
            href="/create"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <>
            <Button
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
            <Link href="/auth/sign-up" className={buttonVariants()}>
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
