import PrimaryLogo from "@components/PrimaryLogo";
import Dropdown from "@components/Layout/Header/Dropdown";
import NavBar from "@components/Layout/Header/NavBar";
import ThemeButton from "@components/Theme/ThemeButton";

export default function Header() {
  return (
    <div className="flex h-16 w-full flex-row justify-around gap-3 border-b px-10 xl:justify-between sm:px-4">
      <div className="mr-4 flex items-center">
        <PrimaryLogo />
      </div>
      <nav className="flex w-full max-w-[1200px] flex-row items-center justify-around gap-6 xl:hidden">
        <NavBar />
      </nav>
      <div className="flex items-center gap-2">
        <ThemeButton />
        <Dropdown />
      </div>
    </div>
  );
}
