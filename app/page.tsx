import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <LoginButton asChild>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton>
    </main>
  );
}
