"use client";

import Link from "next/link";
import { Heart, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur-sm py-8 mt-12">
      <div className="container mx-auto px-4 w-full max-w-7xl flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          <span>and</span>
          <Coffee className="h-4 w-4 text-amber-600" />
          <span>by</span>
          <Link 
            href="https://abdisaketema.com/" 
            target="_blank" 
            className="font-medium text-foreground hover:text-primary transition-colors underline decoration-dotted underline-offset-4 hover:decoration-solid"
          >
            Abdisa Ketema
          </Link>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © 2026 NextProBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
