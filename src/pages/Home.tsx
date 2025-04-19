import { useNavigate } from "react-router-dom";
import { useIntersectionOpacity } from "../hooks/useIntersectionObserver";
import { useState } from "react";

function Home() {
  const { ref: portfolioRef, intersectionRatio: portfolioIR } =
    useIntersectionOpacity();
  const { ref: aboutRef, intersectionRatio: aboutIR } =
    useIntersectionOpacity();
  const { ref: bookingRef, intersectionRatio: bookingIR } =
    useIntersectionOpacity();

  const [portfolioWipe, setPortfolioWipe] = useState(false);
  const [aboutWipe, setAboutWipe] = useState(false);
  const [bookingWipe, setBookingWipe] = useState(false);
  const wipeAnimationTime = 1000;

  const navigate = useNavigate();

  return (
    <main className="flex-grow-2">
      <section
        id="hero"
        className="relative flex flex-col items-center w-full h-screen  "
      >
        <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-gray-100"></div>
        <img
          className="w-2/5 max-w-[200px] opacity-90 mt-17"
          src="/images/logo.png"
          alt="Lizzie McGuire Logo"
        />
        <p className="text-xl text-center mix-blend-multiply mt-4">
          Capturing moments you'll want to keep forever.
        </p>
        <img
          className="absolute top-0 left-0 object-cover w-full h-full -z-10"
          src="/images/cover-photo.JPG"
          alt="Cover Photo"
        />
      </section>
      <div className="flex flex-col landscape:flex-row">
        <section id="portfolio-section" className="flex flex-col w-full mt-4">
          <div
            ref={portfolioRef}
            id="portfolio-card"
            className={`relative h-screen  flex flex-col items-center justify-center hover:bg-white/10! transition`}
            style={{
              background: `rgba(255,255,255,${
                1 - Math.min(1, 0.1 + portfolioIR) * 0.65
              })`,
            }}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-gray-100"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/portfolio-cover.jpg"
              alt="Cover photo for portfolio card"
            />
            
            <img
              className={`absolute top-0 left-0 object-cover w-full h-full transition-all duration-[${wipeAnimationTime/1000}s] ease-in-out z-1`}
              src="/images/portfolio-cover.jpg"
              style={{
                clipPath: `${portfolioWipe ? "circle(72%)" : "circle(0%)"}`,
              }}
            />
            <div
              onClick={() => {
                setPortfolioWipe(true);
                setTimeout(() => navigate("/portfolio"), wipeAnimationTime);
              }}
              className="cursor-pointer p-5 w-46 h-19  text-center relative z-2 text-xl border-4 rounded-lg border-white"
            >
              Portfolio
            </div>
          </div>
        </section>
        <section id="about-section" className="flex flex-col w-full mt-4">
          <div
            ref={aboutRef}
            id="about-card"
            className={`relative h-screen  flex flex-col items-center justify-center hover:bg-white/10! transition`}
            style={{
              background: `rgba(255,255,255,${
                1 - Math.min(1, 0.1 + aboutIR) * 0.65
              })`
            }}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-gray-100"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/about-cover.jpg"
              alt="Cover photo for about me card"
            />
                        <img
              className={`absolute top-0 left-0 object-cover w-full h-full transition-all duration-[${wipeAnimationTime/1000}s] ease-in-out z-1`}
              src="/images/about-cover.jpg"
              style={{
                clipPath: `${aboutWipe ? "circle(72%)" : "circle(0%)"}`,
              }}
            />
            <div
              onClick={() => {
                setAboutWipe(true);
                setTimeout(() => navigate("/about"), wipeAnimationTime);
              }}
              className="cursor-pointer p-5 w-46 h-19  text-center relative z-2 text-xl border-4 rounded-lg border-white"
            >
              About Me
            </div>
          </div>
        </section>
        <section id="booking-section" className="flex flex-col w-full mt-4">
          <div
            ref={bookingRef}
            id="booking-card"
            className={`relative h-screen  flex flex-col items-center justify-center hover:bg-white/10! transition`}
            style={{
              background: `rgba(255,255,255,${
                1 - Math.min(1, 0.1 + bookingIR) * 0.65
              })`,
            }}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-gray-100"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/booking-cover.jpg"
              alt="Cover photo for booking card"
            />
            <img
              className={`absolute top-0 left-0 object-cover w-full h-full transition-all duration-[${wipeAnimationTime/1000}s] ease-in-out z-1`}
              src="/images/booking-cover.jpg"
              style={{
                clipPath: `${bookingWipe ? "circle(72%)" : "circle(0%)"}`,
              }}
            />
            <div
              onClick={() => {
                setBookingWipe(true);
                setTimeout(() => navigate("/booking"), wipeAnimationTime);
              }}
              className="cursor-pointer p-5 w-46 h-19  text-center relative z-2 text-xl border-4 rounded-lg border-white"
            >
              Booking
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
