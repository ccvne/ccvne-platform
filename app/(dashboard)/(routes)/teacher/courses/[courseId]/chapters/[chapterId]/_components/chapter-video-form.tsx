"use client";

import * as z from "zod";
import axios from "axios";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { Pencil, Plus, Sparkles, Video, X } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData.videoUrl) {
        await api.delete(
          `/uploads/${initialData.videoUrl.split("/uploads/")[1]}`
        );
      }
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
        Course Video
        <Button onClick={toggleEdit} variant="ghost" className="h-7 w-7">
          {isEditing && (
            <div className="flex items-center p-1 border border-red-500 rounded-md">
              <X className="h-4 w-4 text-red-500" />
            </div>
          )}
          {!isEditing && !initialData.videoUrl && (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Plus className="h-4 w-4" />
            </div>
          )}
          {!isEditing && initialData.videoUrl && (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Pencil className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 mb-4">
            <video
              src={initialData?.videoUrl}
              title={initialData?.title}
              className={"w-full h-full rounded-md"}
              controls
              controlsList="nodownload"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            contentType="video"
            maxSize={500}
            onChange={(data) => {
              onSubmit({ videoUrl: data.downloadUrl });
            }}
          />
          <div className="flex item-center gap-1 text-xs text-sky-700 mt-4">
            <Sparkles className="w-4 h-4" />
            <p className="">Upload a smooth and clear video to this chapter.</p>
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="flex item-center gap-1 text-xs text-sky-700">
          <Sparkles className="w-4 h-4" />
          <p>
            Videos can take a a few minutes to process. Refresh the page if the
            video does not appear.
          </p>
        </div>
      )}
    </div>
  );
};
