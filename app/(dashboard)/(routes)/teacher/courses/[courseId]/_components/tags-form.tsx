"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Course, Tag } from "@prisma/client";

import { AlertOctagon, Pencil, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Tags } from "./tags";

interface TagsFormProps {
  initialData: Course & {
    tags: Tag[];
  };
  courseId: string;
  tags: Tag[];
  courseTags: Tag[];
}

const formSchema = z.object({
  tagId: z.array(z.string()).min(1),
});

export const TagsForm = ({
  initialData,
  courseId,
  courseTags,
  tags,
}: TagsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData.tags.map((tag) => tag.id)
  );

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagId: selectedTags,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated Successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Tags
        <Button onClick={toggleEdit} variant="ghost" className="h-7 w-7">
          {isEditing ? (
            <div className="flex items-center p-1 border border-red-500 rounded-md">
              <X className="h-4 w-4 text-red-500" />
            </div>
          ) : (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Pencil className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn("text-sm mt-2", !initialData.tags && "text-slate-500")}
        >
          {!initialData.tags ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertOctagon className="w-4 h-4" />
              No tag was selected.
            </p>
          ) : (
            <p>{courseTags.map((tag) => tag.name).join(", ")}</p>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="tagId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      {tags.map((tag) => (
                        <Tags
                          key={tag.id}
                          isSelected={selectedTags.includes(tag.id)}
                          onClick={() => {
                            const newSelectedTags = selectedTags.includes(
                              tag.id
                            )
                              ? selectedTags.filter((id) => id !== tag.id)
                              : [...selectedTags, tag.id];
                            setSelectedTags(newSelectedTags);
                            form.setValue("tagId", newSelectedTags);
                          }}
                        >
                          {tag.name}
                        </Tags>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
