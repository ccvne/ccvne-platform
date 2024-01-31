"use client";

import * as z from "zod";
import axios from "axios";
import { FileText, Pencil, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterPdfFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  pdfUrl: z.string().min(1),
});

export const ChapterPdfForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterPdfFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated Successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-2">
        Course Portable Document Format
        <Button onClick={toggleEdit} variant="ghost" className="h-7 w-7">
          {isEditing && (
            <div className="flex items-center p-1 border border-red-500 rounded-md">
              <X className="h-4 w-4 text-red-500" />
            </div>
          )}
          {!isEditing && !initialData.pdfUrl && (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Plus className="h-4 w-4" />
            </div>
          )}
          {!isEditing && initialData.pdfUrl && (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Pencil className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          {!initialData.pdfUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <FileText className="h-10 w-10 text-slate-500" />
              </div>
            </div>
          ) : (
            <div className="relative aspect-[3/4] md:aspect-video border rounded-md overflow-hidden bg-slate-100">
              <div className="absolute inset-y-0 inset-x-0 w-full h-full">
                <iframe
                  src={`${initialData.pdfUrl}#toolbar=0`}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterPDFs"
            onChange={(url) => {
              if (url) {
                onSubmit({ pdfUrl: url });
              }
            }}
          />
          <div className="flex item-center gap-1 text-xs text-sky-700 mt-4">
            <Sparkles className="w-4 h-4" />
            <p className="">Upload a nice looking PDF to this chapter.</p>
          </div>
        </div>
      )}
      {initialData.pdfUrl && !isEditing && (
        <div className="flex item-center gap-1 text-xs text-sky-700 mt-4">
          <Sparkles className="w-4 h-4" />
          <p>Refresh the page if the PDF does not appear.</p>
        </div>
      )}
    </div>
  );
};
