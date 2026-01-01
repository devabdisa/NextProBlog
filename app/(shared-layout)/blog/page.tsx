import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="py-12">
      <div className="pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from the community.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <Card key={post._id} className="pt-0">
            <div className="relative h-48 w-full overflow-hidden ">
              <Image
                src="https://images.unsplash.com/photo-1615412704911-55d589229864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Random unsplash nature image"
                fill
                className="rounded-t-lg"
              />
            </div>
            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h1 className="text-2xl font-bold hover:text-primary">
                  {post.title}
                </h1>
              </Link>
              <p className="text-muted-foreground line-clamp-3">{post.body}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/${post._id}`}
                className={buttonVariants({
                  className: "w-full",
                })}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
