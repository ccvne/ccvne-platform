import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      headerDescription="No worries, you can try again later."
      headerHref="/auth/login"
    >
      <div />
    </CardWrapper>
  );
};