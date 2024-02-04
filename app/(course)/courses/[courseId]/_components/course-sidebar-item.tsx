"use client";

import { CheckCircle2, Circle, Lock, CircleDot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  isActive: boolean;
};

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);
  const Icon = isCompleted ? CheckCircle2 : isActive ? CircleDot : isLocked ? Lock : Circle;

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center p-5 text-slate-500 text-sm font-medium border-b transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon
          className={cn(
            "w-6 h-6 text-slate-500 ",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        <p className="text-xs md:text-sm">{label.length > 29 ? `${label.slice(0, 29)}...` : label}</p>
      </div>
      <div className={cn(
        "opacity-0 h-full transition-all",
        isActive && "opacity-100",
      )} />
    </button>
  )
}