"use client";

import { Lock } from "lucide-react";
import { Chapter } from "@prisma/client";

interface PDFViewerProps {
  chapter: Chapter;
  isLocked: boolean;
}

export const PDFViewer = ({ chapter, isLocked }: PDFViewerProps) => {
  return (
    <div className="relative aspect-[3/4] md:aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This Chapter is Locked</p>
        </div>
      )}
      {!isLocked && (
        <iframe
          src={`${chapter.pdfUrl!}#toolbar=0`}
          title="PDFViewer"
          className="w-full h-full"
        />
      )}
    </div>
  );
};
