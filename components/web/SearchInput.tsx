"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : "skip"
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Posts..."
        className="w-full pl-8 bg-background"
        value={term}
        onChange={handleInputChange}
      />
      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 z-50">
          {results === undefined ? (
            <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin size-4" /> searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found!
            </div>
          ) : (
            <div className="py-1">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  className="block px-4 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <p className="truncate font-medium ">{post.title}</p>

                  <p className="text-muted-foreground text-xs pt-1">
                    {post.body.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
