import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  label: string;
  description: string;
  href: string;
}

export const Header = ({ label, description, href }: HeaderProps) => {
  const pathname = usePathname();

  let linkText = "";

  if (pathname === "/auth/login") {
    linkText = "Sign up.";
  } else if (pathname === "/auth/register") {
    linkText = "Sign in.";
  } else if (
    pathname === "/auth/reset" ||
    pathname === "/auth/new-password" ||
    pathname === "/auth/new-verification" ||
    pathname === "/auth/error"
  ) {
    linkText = "Back to login.";
  }

  return (
    <div className="flex flex-col w-full space-y-3 border-b border-slate-200 bg-white p-6">
      <Link href="/auth/login">
      <Image src="/logo.png" alt="logo" width={100} height={100} className="w-[10rem] mb-2"/>
      </Link>
      <p className="text-sm text-muted-foreground">
        {description}
        <Link className="ml-1 font-semibold" href={href}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};
