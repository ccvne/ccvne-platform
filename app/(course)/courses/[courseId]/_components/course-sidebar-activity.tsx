import { File } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  name: string;
  url: string;
}

export const CourseSideBarActivity = ({ name, url }: Activity) => {
  const Icon = File;

  return (
    <a
      href={url}
      target="_blank"
      className={cn(
        "w-full flex items-center rounded-md p-2 text-slate-500 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20"
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon className={cn("w-4 h-4")} />
        <p className="text-xs md:text-sm">{name}</p>
      </div>
    </a>
  );
};
