export const EvaluationTags = ({
  children,
  isSelected,
  onClick,
}: {
  children: string;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <a
      onClick={onClick}
      className={`inline-flex justify-center items-center gap-2 flex-shrink-0 rounded-full box-border cursor-default select-none ${
        isSelected ? 'bg-sky-600' : 'bg-sky-700 hover:bg-sky-600'
      } px-3 py-2 h-7 text-xs leading-3`}
    >
      <span className="text-slate-100 font-bold uppercase">{children}</span>
    </a>
  );
};
