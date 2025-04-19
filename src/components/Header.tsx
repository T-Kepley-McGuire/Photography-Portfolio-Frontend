import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerPadding = 2;
  const transitionDuration = 300;
  return (
    <header
      className={`fixed flex w-full flex-row flex-wrap justify-between top-0 z-10 bg-white min-h-12`}
    >
      <Link
        to="/"
        className={`text-black text-lg p-${headerPadding} no-underline`}
        onClick={() => setMenuOpen(false)}
      >
        Lizzie McGuire Photography
      </Link>
      <nav className="w-fit">
        <div
          className={`menu-icon absolute top-0 right-0 flex h-12 w-12 items-center justify-center cursor-pointer transition-transform duration-600 ease-in-out inline landscape:hidden`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div
            className="absolute top-0 right-0 flex h-12 aspect-square items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div
              id="menu-icon"
              className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center cursor-pointer transition-transform duration-${
                2 * transitionDuration
              } ${menuOpen ? "rotate-[360deg]" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Top Line */}
              <span
                className={`absolute w-4/5 h-1 bg-gray-500 rounded transition-all duration-${transitionDuration} ${
                  menuOpen ? "rotate-45 top-45/100" : "top-1/4"
                }`}
              />
              {/* Bottom Line */}
              <span
                className={`absolute w-4/5 h-1 bg-gray-500 rounded transition-all duration-${transitionDuration} ${
                  menuOpen ? "-rotate-45 bottom-45/100" : "bottom-1/4"
                }`}
              />
            </div>
          </div>
        </div>
        {/* ADD THIS TO THE UL CLASS FOR SUBTLE DIVISIONS: landscape:gap-1 landscape:bg-gray-100 */}
        <ul
          className={`nav-list left-0 list-none overflow-hidden  ${
            menuOpen
              ? `h-[175px] w-screen block transition-height duration-${
                  2 * transitionDuration
                } ease-in-out`
              : "h-0"
          } landscape:flex landscape:flex-row landscape:justify-end landscape:h-full landscape:w-fit landscape:duration-0`}
        >
          <li className="cursor bg-white hover:bg-gray-200 active:bg-gray-200 transition-bg duration-200">
            {/* <Link
              to="/"
              className="block p-2 text-black text-lg no-underline "
            >
              Home
            </Link> */}
          </li>
          <li className="cursor bg-white hover:bg-gray-200 active:bg-gray-200 transition-bg duration-200">
            <Link
              to="/portfolio"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </Link>
          </li>
          <li className="cursor bg-white hover:bg-gray-200 active:bg-gray-200 transition-bg duration-200">
            <Link
              to="/about"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="cursor bg-white hover:bg-gray-200 active:bg-gray-200 transition-bg duration-200">
            <Link
              to="/booking"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Booking
            </Link>
          </li>
          <li className="cursor bg-white hover:bg-gray-200 active:bg-gray-200 transition-bg duration-200">
            <a
              href="https://lizziemcguirephotography.pixieset.com/"
              className="block p-2 text-black text-lg no-underline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Client Gallery
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
