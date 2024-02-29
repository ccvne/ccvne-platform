"use client";

import * as z from "zod";
import axios from "axios";
import api from "@/lib/api";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Plus, File, X, AlertOctagon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Updated Successfully");
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
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
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
        Resources & Attachments
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
          <div className="flex item-center gap-1 text-xs text-sky-700 mt-4">
            <Sparkles className="w-4 h-4" />
            <p>
              Add anything your students might need to complete your course.
            </p>
          </div>
        </>
      )}
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertOctagon className="w-4 h-4" />
              You did not upload an attachment.
            </div>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center px-2 py-2 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id, attachment.url)}
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
