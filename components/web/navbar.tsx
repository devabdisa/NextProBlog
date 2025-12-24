import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "../ui/button";

export function Navbar() {
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
        <ThemeToggle />
        <Link href="/signup" className={buttonVariants()}>
          Sign Up
        </Link>
        <Link
          href="/login"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
