import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NextProBlog | Explore Ideas",
  description: "Read our latest articles and insights on Tech and Design",
  category: "Modern Web Development",
  authors: [{ name: "Abdisa ketema" }],
};

export default async function BlogPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="relative py-20 bg-muted/30 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Discover the latest thoughts, tutorials, and insights from our community of developers and designers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-7xl">
        <LoadBlogList />
      </div>
    </div>
  );
}

async function LoadBlogList() {
  const data = await fetchQuery(api.posts.getPosts);
  
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No posts found yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.map((post, index) => (
        <Link 
          href={`/blog/${post._id}`} 
          key={post._id}
          className="group relative flex flex-col h-full bg-card hover:bg-card/50 border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 animate-in fade-in zoom-in-50 fill-mode-both"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
             <Image
              src={
                post.imageUrl ??
                "https://images.unsplash.com/photo-1615412704911-55d589229864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-50" />
            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
               <span className="inline-flex items-center text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                  Read Article <ArrowRight className="ml-1 h-3 w-3" />
               </span>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-full">
                <Calendar className="h-3 w-3" />
                {new Date(post._creationTime).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {Math.ceil(post.body.length / 500)} min read
              </span>
            </div>
            
            <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
              {post.body}
            </p>

            <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm">
               <span className="font-medium text-primary">Read more</span>
               <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
