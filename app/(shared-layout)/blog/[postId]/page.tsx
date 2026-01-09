import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";
import { PostPresence } from "@/components/web/PostPresence";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">;
  }>;
}

export async function generateMetadata({
  params,
}: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: postId });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.body,
  };
}


export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;

  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { postId: postId }),
    await preloadQuery(api.comments.getCommentsById, {
      postId: postId,
    }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!userId) {
    return redirect("/auth/login");
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-4xl font-extrabold text-destructive mb-4">
           404 - Post not found
        </h1>
        <p className="text-muted-foreground mb-8">
           The article you are looking for does not exist or has been removed.
        </p>
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Blog
        </Link>
      </div>
    );
  }


  return (
    <article className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-background">
      {/* Hero Header with Image Background */}
      <div className="relative h-[60vh] min-h-100 w-full overflow-hidden">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1615412704911-55d589229864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 container mx-auto max-w-4xl z-10">
           <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white mb-8 hover:underline transition-all w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-lg leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/95 pb-4">
             <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-sm">
                   <span className="font-bold text-white text-lg">NP</span>
                </div>
                <div>
                   <p className="text-base font-semibold">NextPro Author</p>
                   <p className="text-sm text-white/80 opacity-90">
                       {new Date(post._creationTime).toLocaleDateString("en-US", {
                         weekday: 'long',
                         year: 'numeric', 
                         month: 'long', 
                         day: 'numeric'
                       })}
                   </p>
                </div>
             </div>
             
             {userId && (
                <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                   <PostPresence roomId={post._id} userId={userId} />
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 mt-16 block">
        <div className="bg-card text-card-foreground p-0 md:p-0 w-full">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-serif whitespace-pre-line wrap-break-word tracking-wide">
            {post.body}
          </p>
        </div>
        
        <Separator className="my-16" />
        
        <div className="bg-secondary/20 rounded-3xl p-6 md:p-10 border border-border/50 shadow-sm w-full">
           <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
             Discussion 
             <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full border">Community</span>
           </h3>
           <CommentSection preloadedComments={preloadedComments} />
        </div>
      </div>
    </article>
  );
}
