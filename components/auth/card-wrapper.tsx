"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  headerHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  headerHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="relative z-10 w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
      <CardHeader className="p-0">
        <Header
          label={headerLabel}
          description={headerDescription}
          href={headerHref}
        />
      </CardHeader>
      <CardContent className="bg-gray-50 p-6">{children}</CardContent>
      {/*
      {showSocial && (
        <CardFooter className="flex flex-col gap-4 bg-gray-50">
          <div className="flex items-center w-full justify-center gap-4">
            <div className="w-full h-0.5 bg-gray-300" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="w-full h-0.5 bg-gray-300" />
          </div>
          <Social />
        </CardFooter>
      )}
      */}
    </Card>
  );
};
