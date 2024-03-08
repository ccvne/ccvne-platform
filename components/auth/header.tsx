interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
      <h3 className="text-xl font-semibold">Sign in to ap-pdf.club</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};
