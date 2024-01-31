"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";

import { ChapterVideoForm } from "./chapter-video-form";
import { ChapterPdfForm } from "./chapter-pdf-form";

interface ChapterOptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  option: z.enum(["videoUrl", "pdfUrl"]),
});

export const ChapterOptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterOptionFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success("Chapter Content Selection Successfully");
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="option"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={[
                    { label: "Video", value: "videoUrl" },
                    { label: "Portable Document Format", value: "pdfUrl" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("option") === "videoUrl" ? (
          <ChapterVideoForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        ) : (
          <ChapterPdfForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        )}
      </form>
    </Form>
  );
};
