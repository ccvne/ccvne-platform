import { currentUser } from "@/lib/auth";

export default async function Hero() {
  const user = await currentUser();

  return (
    <div className="container relative z-[2] h-[30rem] flex flex-col items-center overflow-hidden border-x border-t bg-background px-6 pt-12 text-center md:pt-20">
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-gray-700 sm:text-6xl sm:leading-[1.15]">
        Your Ultimate Learning
        <br />
        <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
          Destination
        </span>
      </h1>
      <h2 className="max-w-2xl my-5 text-gray-700 sm:text-xl">
        Ap-pdf.club is the ultimate open-source learning platform that connects
        teachers with developers around the globe.
      </h2>

      <div className="mx-auto mt-5 flex max-w-fit space-x-4">
        <a
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all border-gray-700 bg-gray-700 text-white hover:bg-white hover:text-black"
          href={!user ? "/auth/register" : "/feed"}
        >
          Start Learning
        </a>
        <a
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          href="/auth/login"
        >
          Log In
        </a>
      </div>
      <div
        className="mb-[-150px] mt-16 size-[300px] rounded-full bg-background md:mb-[-250px] md:size-[500px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 0%, transparent 40%, hsl(var(--primary)))",
        }}
      />
    </div>
  );
}
