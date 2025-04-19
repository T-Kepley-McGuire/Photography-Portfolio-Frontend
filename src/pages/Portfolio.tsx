// components/PortfolioSection.tsx
import { useEffect, useState } from "react";
import { Masonry } from "masonic";

const API_URL = import.meta.env.VITE_API_URL;

type ImageData = {
  url: string;
  index: number;
};

function Portfolio() {
  // const COLUMN_WIDTH = 400;

  const [imageUrls, setImageUrls] = useState<ImageData[]>([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/portfolio/images`)
      .then((res) => res.json())
      .then((urls: string[]) =>
        setImageUrls(
          urls.map((url, i) => ({
            url: `${API_URL}${url}`,
            index: i,
          }))
        )
      );
  }, []);

  const PortfolioCard = ({
    index,
    data: { url },
  }: {
    index: number;
    data: {
      url: string; 
    };
  }) => (
    <img
      src={url}
      alt={`Image ${index}`}
      className="photothumb w-full object-cover min-h-[300px] cursor-pointer transition-opacity duration-500"
      onClick={() => {
        setModalIndex(index);
        setShowModal(true);
      }}
    />
  );

  return (
    <main>
      <section className="h-screen flex flex-col justify-evenly items-center">
        <h2 className="text-3xl font-semibold">My Work</h2>
        <p className="text-lg">
          Explore my portfolio to see a range of my work
        </p>
        <div className="absolute bottom-0 flex flex-col items-center transition-opacity duration-1000">
          <p className="text-black text-lg transition-opacity duration-300">
            Portfolio
          </p>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.6}
            stroke="currentColor"
            className="size-18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </section>

      <Masonry
        id="portfolio-container"
        items={imageUrls}
        render={PortfolioCard}
        columnGutter={12}
        columnWidth={400}
        overscanBy={1}
      />

      <div
        className={`fixed inset-0 z-50 items-center justify-center ${
          showModal ? "flex" : "hidden"
        }`}
      >
        
        <svg
          onClick={() => {
            console.log("decreasing image element index");
            setModalIndex(
              (prev) => (prev + imageUrls.length - 1) % imageUrls.length
            );
          }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="hidden sm:block size-20 select-none rounded-[50%] bg-black/30 fixed left-[5%] top-1/2 text-[96px] text-gray-300 transform -translate-y-1/2 hover:-translate-x-5 transition cursor-pointer z-2"
        >
          <path
          className="-translate-x-[1px]"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        <div className="modal-content absolute w-screen h-screen bg-gray-900/25 flex items-center justify-center -z-1">
          <div
            className="fixed inset-0 bg-black/5 z-0"
            onClick={() => setShowModal(false)}
          />
          <img
            className="shadow-2xl absolute max-w-[95vw] max-h-[95vh] object-contain z-5"
            alt=""
            src={
              imageUrls.length > 0 ? imageUrls[modalIndex]["url"] : undefined
            }
          />
        </div>

        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          onClick={() => setShowModal(false)}
          className="size-10 select-none rounded-[50%] bg-black/30 fixed right-[5%] top-[10%] text-white transform -translate-y-1/2 hover:rotate-180 transition duration-300 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

        <svg
          onClick={() => {
            console.log("increasing image element index");
            setModalIndex((prev) => (prev + 1) % imageUrls.length);
          }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="hidden sm:block size-20 select-none rounded-[50%] bg-black/30 fixed right-[5%] top-1/2 text-[96px] text-white -translate-y-1/2 hover:translate-x-5 transition cursor-pointer z-2"
        >
          <path
            className="translate-x-[1px]"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>

      </div>
    </main>
  );
}

export default Portfolio;
