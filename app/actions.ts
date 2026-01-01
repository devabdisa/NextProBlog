"use server";

import z from "zod";
import { postSchema } from "./schemas/post";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function CreateBlogAction(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  return redirect("/");
}
