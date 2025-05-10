import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerPadding = 2;
  const transitionDuration = 300;
  return (
    <header
      className={`fixed flex w-full flex-row flex-wrap justify-between top-0 z-10 bg-mygreen-50 min-h-12`}
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
          className={`menu-icon absolute top-0 right-0 flex h-12 w-12 items-center justify-center cursor-pointer transition-transform duration-600 ease-in-out landscape:hidden`}
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
              : " relative h-0"
          } landscape:flex landscape:flex-row landscape:justify-end landscape:h-full landscape:w-fit landscape:duration-0`}
        >
          <li className="cursor-pointer bg-mygreen-50 hover:bg-mygreen-200 active:bg-mygreen-200 transition-bg duration-200">
            {/* <Link
              to="/"
              className="block p-2 text-black text-lg no-underline "
            >
              Home
            </Link> */}
          </li>
          <li className="cursor-pointer bg-mygreen-50 hover:bg-mygreen-200 active:bg-mygreen-200 transition-bg duration-200">
            <Link
              to="/portfolio"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </Link>
          </li>
          <li className="cursor-pointer bg-mygreen-50 hover:bg-mygreen-200 active:bg-mygreen-200 transition-bg duration-200">
            <Link
              to="/about"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="cursor-pointer bg-mygreen-50 hover:bg-mygreen-200 active:bg-mygreen-200 transition-bg duration-200">
            <Link
              to="/booking"
              className="block p-2 text-black text-lg no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Booking
            </Link>
          </li>
          <li className="cursor-pointer bg-mygreen-50 hover:bg-mygreen-200 active:bg-mygreen-200 transition-bg duration-200">
            <a
              href=" relative https://lizziemcguirephotography.pixieset.com/"
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
}

export default function Header() {
  // const [menuOpen, setMenuOpen] = useState(true);
  // const [scrollPos, setScrollPos] = useState(0);

  // const controlMenu = () => {
  //   if (window.scrollY > scrollPos) {
  //     setMenuOpen(false);
  //   } else {
  //     setMenuOpen(true);
  //   }
  //   setScrollPos(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", controlMenu);
  //   return () => {
  //     window.removeEventListener("scroll", controlMenu);
  //   };
  // });

  return (
    <header
      className={`absolute flex w-full flex-row flex-wrap items-center justify-center gap-x-3 sm:gap-[3%] top-0 z-10 bg-transparent min-h-12 transition-top duration-500 bg-linear-to-b from-mygreen-100/50 to-transparent`}
    >
      <Link
        to="/portfolio"
        className="relative order-2 sm:order-1 h-fit block py-2 sm:px-0 md:px-1.5 text-black text-md no-underline after:absolute after:h-[1px] after:bg-black after:w-0 after:bottom-[10px] after:left-[5%] after:transition-all hover:after:w-[90%]"
      >
        Portfolio
      </Link>
      <Link
        to="/about"
        className=" relative order-3 sm:order-2 h-fit block py-2 sm:px-0 md:px-1.5 text-black text-md no-underline after:absolute after:h-[1px] after:bg-black after:w-0 after:bottom-[10px] after:left-[5%] after:transition-all hover:after:w-[90%]"
      >
        About
      </Link>
      <Link
        to="/"
        className="relative text-black text-2xl text-center py-4 px-2 sm:px-2 md:px-4 w-full sm:w-fit order-1 sm:order-3
          "
          >
        {/* before:block before:absolute before:h-[1px] before:bg-black before:w-0 before:bottom-[53px] before:left-[33%] before:sm:left-[9%] before:transition-all before:delay-100 hover:before:delay-0 hover:before:w-[186px] hover:before:sm:w-[82%]
          after:block after:absolute after:h-[1px] after:bg-black after:w-0 after:bottom-[20px] after:left-[11.5%] after:transition-all after:delay-0 hover:after:delay-100 hover:after:w-[77%]*/}
        Lizzie McGuire<br></br>Photography
      </Link>
      <Link
        to="/investments"
        className=" relative order-4 h-fit block py-2 sm:px-0 md:px-1.5 text-black text-md no-underline after:absolute after:h-[1px] after:bg-black after:w-0 after:bottom-[10px] after:left-[5%] after:transition-all hover:after:w-[90%]"
      >
        Investments
      </Link>
      <Link
        to="/contact"
        className=" relative order-5 h-fit block py-2 sm:px-0 md:px-1.5 text-black text-md no-underline after:absolute after:h-[1px] after:bg-black after:w-0 after:bottom-[10px] after:left-[5%] after:transition-all hover:after:w-[90%]"
      >
        Contact
      </Link>
    </header>
  );
}
