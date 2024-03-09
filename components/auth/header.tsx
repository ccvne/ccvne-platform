import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  label: string;
  description: string;
  href: string;
}

export const Header = ({ label, description, href }: HeaderProps) => {
  const pathname = usePathname();

  console.log(pathname)

  let linkText = "";

  if (pathname === "/auth/login") {
    linkText = "Sign up.";
  } else if (pathname === "/auth/register") {
    linkText = "Sign in.";
  }

  return (
    <div className="flex flex-col w-full space-y-3 border-b border-gray-200 bg-white p-6">
      <h1 className="font-bold text-2xl">{label}</h1>
      <p className="text-sm text-muted-foreground">
        {description}
        <Link className="ml-1 font-semibold" href={href}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};
