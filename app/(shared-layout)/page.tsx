"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";

export default function Home() {
  const posts = useQuery(api.posts.getRecentPosts, { limit: 3 });

  return (
    <div className="flex flex-col gap-20 pb-10">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
        
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Welcome to my digital garden
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Thoughts, Stories & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600">
              Ideas for the Future
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            A space where I share my journey in web development, design patterns, and the technology shaping our world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link
              href="#latest-posts"
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Read Latest Posts
            </Link>
            <Link
              href="https://abdisaketema.com/"
              target="_blank"
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="latest-posts" className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Latest Writings</h2>
          {/* Using a placeholder link for 'View All' if a dedicated blog page exists, otherwise just omit or link to same page */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts === undefined ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/40 bg-card overflow-hidden h-112.5 flex flex-col"
              >
                 <div className="h-48 bg-muted/60 animate-pulse" />
                 <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="h-4 w-24 bg-muted/60 rounded animate-pulse" />
                    <div className="h-8 w-full bg-muted/60 rounded animate-pulse" />
                    <div className="h-20 w-full bg-muted/40 rounded animate-pulse" />
                    <div className="mt-auto h-4 w-32 bg-muted/60 rounded animate-pulse" />
                 </div>
              </div>
            ))
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No posts published yet.
            </div>
          ) : (
            posts.map((post, index) => (
              <Link
                href={`/blog/${post._id}`}
                key={post._id}
                className="group relative flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-in fade-in zoom-in-50 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                 <div className="aspect-video w-full overflow-hidden bg-secondary relative">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/50">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                  
                    {new Date(post._creationTime).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {post.body} 
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium mt-auto">
                    Read Article 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* About / Portfolio Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="rounded-3xl bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 md:p-12 overflow-hidden relative text-white">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About the Author
              </h2>
              <p className="text-zinc-400 mb-6 text-lg leading-relaxed">
                Hi, I&apos;m Abdisa Ketema. I build accessible, pixel-perfect, and performant web experiences. 
                I love exploring new technologies and sharing what I learn along the way.
              </p>
              <Link
                href="https://abdisaketema.com/"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
              >
                Check out my portfolio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            {/* If there was an image of the user, it would go here. For now, a stylized graphic or placeholder. */}
            <div className="hidden md:flex justify-center items-center">
               <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-linear-to-tr from-primary to-purple-500 p-0.5">
                 <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                    <span className="text-6xl animate-pulse">👨‍💻</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
