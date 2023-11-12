"use client";

import { Category } from "@prisma/client";
import { FcCircuit, FcLinux, FcCommandLine, FcCapacitor } from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Hardware: FcCircuit,
  "Sistemas Operativos": FcLinux,
  Código: FcCommandLine,
  "Serviços e Ligações Fisicas": FcCapacitor,
};

export const Categories = ({ items }: CategoriesProps) => {
  const allCategory: Category = { id: "all", name: "All" };

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {/* Render the default "All" category: */}
      <CategoryItem
        key={allCategory.id}
        label={allCategory.name}
        value={allCategory.id}
      />

      {/* Render other categories: */}
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
