import { Background } from "@/components/background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Background />
      <div className="relative z-10 h-full flex items-center justify-center">{children}</div>
    </>
  );
};

export default AuthLayout;
