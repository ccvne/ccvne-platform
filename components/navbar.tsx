import Link from "next/link";

const Navbar = async () => {
  return (
    <header className="md:px-[21.5rem] fixed inset-x-0 top-0 z-30 w-full border-b bg-transparent backdrop-blur-md">
      <div className="py-4 flex md:px-20 px-4 justify-between">
        <div>
          <Link href="/">
            <h1 className="tracking-tighter font-bold text-xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
              Clubes Ciência Viva na Escola
            </h1>
          </Link>
        </div>
        <h1 className="tracking-tighter font-bold text-xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
          ap-pdf.club
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
