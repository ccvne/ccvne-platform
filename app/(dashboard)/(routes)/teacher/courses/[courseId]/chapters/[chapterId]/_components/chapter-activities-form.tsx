"use client";

import * as z from "zod";
import axios from "axios";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Chapter } from "@prisma/client";

import { Plus, File, X, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/file-upload";

interface ChapterActivitiesFormProps {
  initialData: Chapter & { activities: Activity[] };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

export const ChapterActivitiesForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterActivitiesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/activities`,
        values
      );
      toast.success("Chapter Updated Successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  const onDelete = async (id: string, url: string) => {
    const urlId = url.split("/uploads/")[1];

    try {
      setDeletingId(id);
      await api.delete(`/uploads/${urlId}`);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/activities/${id}`
      );
      toast.success("Attachment Deleted");
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-2">
        Activities & Exercices
        <Button onClick={toggleEdit} variant="ghost" className="h-7 w-7">
          {isEditing ? (
            <div className="flex items-center p-1 border border-red-500 rounded-md">
              <X className="h-4 w-4 text-red-500" />
            </div>
          ) : (
            <div className="flex items-center p-1 border border-slate-700 rounded-md">
              <Plus className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
      {isEditing && (
        <>
          <FileUpload
            contentType="all"
            maxSize={12}
            onChange={(data) => {
              onSubmit({ url: data.downloadUrl, name: data.fileName });
            }}
          />
          <div className="flex item-center gap-1 text-xs text-foreground mt-4">
            <Sparkles className="w-4 h-4 text-sky-700" />
            <p>
              Add activities or exercises anything for your students about this
              chapter.
            </p>
          </div>
        </>
      )}
      {!isEditing && (
        <>
          {initialData.activities.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-md border-2 text-card-foreground flex items-center justify-center space-y-6 bg-transparent p-16 w-full h-64">
                <div className="shrink-0 rounded-full border-2 border-dashed p-4">
                  <File className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-foreground">
              <Lightbulb className="w-4 h-4 rotate-[20deg] text-yellow-400" />
               No activities or exercises were added.
            </div>
            </div>
          )}
          {initialData.activities.length > 0 && (
            <div className="space-y-2">
              {initialData.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center px-2 py-2 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{activity.name}</p>
                  {deletingId !== activity.id && (
                    <button
                      onClick={() => onDelete(activity.id, activity.url)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
