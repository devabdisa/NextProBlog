"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { commentSchema } from "@/app/schemas/comment";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export default function CommentSection() {
  const params = useParams<{ postId: Id<"posts"> }>();
  const data = useQuery(api.comments.getCommentsById, {
    postId: params.postId,
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    },
  });

  const createComment = useMutation(api.comments.createComment);

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(data);
        form.reset();
        toast.success("Comment created");
      } catch {
        toast.error("Failed to create post");
      }
    });
  }

  if (data === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2 border-b items-center">
        <MessageSquare className="size-5" />
        <h1 className="text-xl font-bold">{data.length} Comments</h1>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Comment</FieldLabel>
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    placeholder="Share your thoughts"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin size-4" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Comment</span>
              )}
            </Button>
          </FieldGroup>
        </form>
        {data?.length > 0 && <Separator />}
        <section className="space-y-6 ">
          {data?.map((comment) => (
            <div key={comment._id}>
              <div className="flex gap-4">
                <Avatar className="size-12 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">{comment.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment._creationTime).toLocaleDateString(
                        "en-US"
                      )}
                    </p>
                  </div>
                  <p className="text-foreground/90">{comment.body}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
