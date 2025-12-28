"use client";

import { postSchema } from "@/app/schemas/post";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function BlogpostPage() {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Create Post
        </h1>
        <p className=" text-xl text-muted-foreground pt-4">
          Share your thought with the community
        </p>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new Blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="a cool blog title"
                      type="text"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Blog Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="a cool blog content"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button>Create Post</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
