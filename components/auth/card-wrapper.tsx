"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[440px] rounded-2xl shadow-md">
      <CardHeader className="p-0">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="bg-neutral-100 p-6">
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter className="bg-neutral-100">
          <Social />
        </CardFooter>
      )}
      <CardFooter className="bg-neutral-100">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};