"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { CheckCircle2, Circle, Lock, CircleDot } from "lucide-react";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isLocked: boolean;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseSidebarItem = ({
  id,
  label,
  courseId,
  isLocked,
  isCompleted,
  nextChapterId,
}: CourseSidebarItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const confetti = useConfettiStore();

  const isActive = pathname?.includes(id);

  const Icon = isHovered
    ? CheckCircle2
    : isCompleted
    ? CheckCircle2
    : isActive
    ? CircleDot
    : isLocked
    ? Lock
    : Circle;

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  const onIconClick = async () => {
    try {
      if (!isLocked) {
        if (isCompleted) {
          await axios.put(`/api/courses/${courseId}/chapters/${id}/progress`, {
            isCompleted: false,
          });

          toast.success("Chapter progress undone!");
          router.refresh();
        } else {
          await axios.put(`/api/courses/${courseId}/chapters/${id}/progress`, {
            isCompleted: true,
          });

          toast.success("Chapter completed!");
          router.refresh();

          if (!isCompleted && !nextChapterId) {
            confetti.onOpen();
          }

          if (!isCompleted && nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            router.refresh();
          }
        }
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update chapter progress. Please try again later.");
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "w-full flex items-center rounded-md p-2 text-slate-500 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-800 font-semibold",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon
          className={cn(
            "w-4 h-4 text-slate-500 cursor-pointer",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700",
            isHovered && "text-slate-800"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onIconClick}
        />
        <p className="text-xs md:text-sm">
          {label.length > 29 ? `${label.slice(0, 29)}...` : label}
        </p>
      </div>
      <div
        className={cn(
          "opacity-0 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
