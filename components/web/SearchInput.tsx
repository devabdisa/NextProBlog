"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : "skip"
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Posts..."
          className="w-full pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-border transition-all duration-300 rounded-full"
          value={term}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
          {results === undefined ? (
            <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin size-4" /> searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found for {term}
            </div>
          ) : (
            <div className="py-1">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  className="block px-4 py-3 hover:bg-secondary/50 text-sm transition-colors border-b last:border-0 border-border/40"
                  onClick={() => setOpen(false)}
                >
                  <p className="font-medium text-foreground truncate">
                    {post.title}
                  </p>
                  <p className="text-muted-foreground text-xs pt-0.5 line-clamp-1">
                    {post.body}
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
