import Link from "next/link";

const Navbar = async () => {
  return (
    <header className="md:px-[21rem] fixed inset-x-0 top-0 z-30 w-full border-b bg-transparent backdrop-blur-md">
      <div className="py-4 flex md:px-20 px-4 justify-between">
        <div>
          <Link href="/">
            <h1 className="tracking-tighter font-bold text-xl bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text text-transparent">
              Clubes Ciência Viva na Escola
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
