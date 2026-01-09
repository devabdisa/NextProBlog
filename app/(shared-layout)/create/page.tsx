"use client";

import { CreateBlogAction } from "@/app/actions";
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
import { Loader2, UploadCloud, FileText, Image as ImageIcon } from "lucide-react";
import { useTransition, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    startTransition(async () => {
      await CreateBlogAction(values);
    });
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Create New Article
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge, tutorials, or thoughts with the NextPro community.
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
           <Card className="border-border/50 shadow-xl shadow-primary/5">
             <CardHeader>
               <CardTitle>Article Details</CardTitle>
               <CardDescription>Fill in the content of your amazing post.</CardDescription>
             </CardHeader>
             <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Title
                        </label>
                        <div className="relative">
                          <Input
                            placeholder="e.g. The Future of Web Development"
                            className="pl-10 h-12 text-lg"
                            {...field}
                          />
                          <FileText className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                        </div>
                         {fieldState.error && (
                           <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                         )}
                      </div>
                    )}
                  />

                  <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                         <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           Content
                         </label>
                        <Textarea
                          placeholder="Write your story here..."
                          className="min-h-[300px] text-base leading-relaxed p-4 resize-y"
                          {...field}
                        />
                         {fieldState.error && (
                           <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                         )}
                      </div>
                    )}
                  />

                  <div className="pt-4">
                     <Button disabled={isPending} className="w-full h-12 text-base" size="lg">
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin mr-2 size-5" />
                          Publishing...
                        </>
                      ) : (
                        "Publish Article"
                      )}
                    </Button>
                  </div>
                </form>
             </CardContent>
           </Card>

           <div className="space-y-6">
              <Card className="border-border/50 shadow-lg">
                 <CardHeader>
                    <CardTitle>Cover Image</CardTitle>
                    <CardDescription>Add a visual to your story.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <Controller
                      name="image"
                      control={form.control}
                      render={({ field: { onChange, value, ...field }, fieldState }) => (
                        <div className="space-y-4">
                           <div className={`relative border-2 border-dashed rounded-xl p-8 transition-colors text-center ${preview ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                   const file = e.target.files?.[0];
                                   if (file) {
                                      onChange(file);
                                      setPreview(URL.createObjectURL(file));
                                   }
                                }}
                                {...field}
                              />
                              {preview ? (
                                 <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                       <span className="text-white text-sm font-medium">Change Image</span>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                       <UploadCloud className="h-6 w-6" />
                                    </div>
                                    <p className="font-medium text-sm">Click to upload or drag and drop</p>
                                    <p className="text-xs">SVG, PNG, JPG or GIF</p>
                                 </div>
                              )}
                           </div>
                           {fieldState.error && (
                             <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                           )}
                        </div>
                      )}
                    />
                 </CardContent>
              </Card>

              <Card className="bg-blue-500/10 border-blue-500/20">
                 <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400">Pro Tip</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                       Articles with high-quality cover images get 2x more engagement. Make sure your title is catchy and your content provides value!
                    </p>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
