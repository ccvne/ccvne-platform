"use client";

import qs from "query-string";
import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
};

export const CategoryItem = ({
  label,
  value,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value || (value === 'all' && !currentCategoryId);

  const onClick = () => {
    const newCategoryId = value === 'all' ? null : value;

    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: newCategoryId,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm rounded-md flex items-center gap-x-1 hover:bg-slate-200 transition cursor-pointer bg-muted",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      <div className="truncate text-xs font-semibold">
        {label}
      </div>
    </button>
  )
}