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
    <article className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Header with Image Background */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1615412704911-55d589229864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={post.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto max-w-4xl">
           <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white mb-6 hover:underline transition-all"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90">
             <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                   <span className="font-bold text-white">NP</span>
                </div>
                <div>
                   <p className="text-sm font-medium">NextPro Author</p>
                   <p className="text-xs text-white/70">
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
                <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
                   <PostPresence roomId={post._id} userId={userId} />
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl mt-12">
        <div className="prose prose-lg dark:prose-invert prose-blue max-w-none">
          <p className="text-xl leading-8 text-foreground/80 font-serif whitespace-pre-wrap">
            {post.body}
          </p>
        </div>
        
        <Separator className="my-16" />
        
        <div className="bg-muted/30 rounded-3xl p-6 md:p-10 border border-border/50">
           <h3 className="text-2xl font-bold mb-6">Discussion</h3>
           <CommentSection preloadedComments={preloadedComments} />
        </div>
      </div>
    </article>
  );
}
