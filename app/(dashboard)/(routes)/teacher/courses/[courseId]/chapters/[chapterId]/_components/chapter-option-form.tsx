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
import { AlertOctagon } from "lucide-react";

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  const hasPdfUrlOrVideoUrl = initialData.pdfUrl || initialData.videoUrl;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {!hasPdfUrlOrVideoUrl && (
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
        )}
        {(form.watch("option") === "videoUrl" || initialData.videoUrl) && (
          <ChapterVideoForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        )}
        {(form.watch("option") === "pdfUrl" || initialData.pdfUrl) && (
          <ChapterPdfForm
            initialData={initialData}
            courseId={courseId}
            chapterId={chapterId}
          />
        )}
        {!hasPdfUrlOrVideoUrl && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-slate-100 p-2 rounded-md border">
            <AlertOctagon className="w-4 h-4" />
            You did not select a chapter content type.
          </div>
        )}
      </form>
    </Form>
  );
};
