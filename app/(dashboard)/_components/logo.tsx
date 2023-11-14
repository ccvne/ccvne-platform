import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex">
      <Image height={130} width={110} alt="logo" src="/logo.png" />
      <Image height={130} width={140} alt="identification" src="/identification.png" />
    </div>
  );
};
