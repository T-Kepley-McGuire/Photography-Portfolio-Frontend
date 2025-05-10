// // components/PortfolioSection.tsx
// import { useEffect, useState } from "react";
// import { Masonry } from "masonic";

// const API_URL = import.meta.env.VITE_API_URL;

// type ImageData = {
//   url: string;
//   index: number;
// };

// function Portfolio() {
//   // const COLUMN_WIDTH = 400;

//   const [imageUrls, setImageUrls] = useState<ImageData[]>([]);
//   const [modalIndex, setModalIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch(`${API_URL}/portfolio/images`)
//       .then((res) => res.json())
//       .then((urls: string[]) =>
//         setImageUrls(
//           urls.map((url, i) => ({
//             url: `${API_URL}${url}`,
//             index: i,
//           }))
//         )
//       );
//   }, []);

//   const PortfolioCard = ({
//     index,
//     data: { url },
//   }: {
//     index: number;
//     data: {
//       url: string; 
//     };
//   }) => (
//     <img
//       src={url}
//       alt={`Image ${index}`}
//       className="photothumb w-full object-cover min-h-[300px] cursor-pointer transition-opacity duration-500"
//       onClick={() => {
//         setModalIndex(index);
//         setShowModal(true);
//       }}
//     />
//   );

  

//   return (
//     <main >
//       <section className="h-[50vh] flex flex-col justify-evenly items-center">
//         <h2 className="text-3xl font-semibold">My Work</h2>
//         <p className="text-lg">
//           Explore my portfolio to see a range of my work
//         </p>
//       </section>

//       <Masonry
//         id="portfolio-container"
//         items={imageUrls}
//         render={PortfolioCard}
//         columnGutter={12}
//         columnWidth={400}
//         overscanBy={10000}
//       />

//       <div
//         className={`fixed inset-0 z-50 items-center justify-center ${
//           showModal ? "flex" : "hidden"
//         }`}
//       >
        
//         <svg
//           onClick={() => {
//             console.log("decreasing image element index");
//             setModalIndex(
//               (prev) => (prev + imageUrls.length - 1) % imageUrls.length
//             );
//           }}
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1}
//           stroke="currentColor"
//           className="hidden sm:block size-20 select-none rounded-[50%] bg-black/30 fixed left-[5%] top-1/2 text-[96px] text-gray-300 transform -translate-y-1/2 hover:-translate-x-5 transition cursor-pointer z-2"
//         >
//           <path
//           className="-translate-x-[1px]"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15.75 19.5 8.25 12l7.5-7.5"
//           />
//         </svg>

//         <div className="modal-content absolute w-screen h-screen bg-gray-900/25 flex items-center justify-center -z-1">
//           <div
//             className="fixed inset-0 bg-black/5 z-0"
//             onClick={() => setShowModal(false)}
//           />
//           <img
//             className="shadow-2xl absolute max-w-[95vw] max-h-[95vh] object-contain z-5"
//             alt=""
//             src={
//               imageUrls.length > 0 ? imageUrls[modalIndex]["url"] : undefined
//             }
//           />
//         </div>

//         <svg
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1}
//           stroke="currentColor"
//           onClick={() => setShowModal(false)}
//           className="size-10 select-none rounded-[50%] bg-black/30 fixed right-[5%] top-[10%] text-white transform -translate-y-1/2 hover:rotate-180 transition duration-300 cursor-pointer"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 18 18 6M6 6l12 12"
//           />
//         </svg>

//         <svg
//           onClick={() => {
//             console.log("increasing image element index");
//             setModalIndex((prev) => (prev + 1) % imageUrls.length);
//           }}
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1}
//           stroke="currentColor"
//           className="hidden sm:block size-20 select-none rounded-[50%] bg-black/30 fixed right-[5%] top-1/2 text-[96px] text-white -translate-y-1/2 hover:translate-x-5 transition cursor-pointer z-2"
//         >
//           <path
//             className="translate-x-[1px]"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m8.25 4.5 7.5 7.5-7.5 7.5"
//           />
//         </svg>

//       </div>
//     </main>
//   );
// }

// export default Portfolio;

// components/PortfolioSection.tsx
import { useEffect, useRef, useState } from "react";
import { Masonry } from "masonic";

const API_URL = import.meta.env.VITE_API_URL;

type ImageData = {
  url: string;
  index: number;
};

function Portfolio() {
  const [imageUrls, setImageUrls] = useState<ImageData[]>([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // refs to track touch positions
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const SWIPE_THRESHOLD = 50;

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

  // record where touch started
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  // record where touch ended, then decide
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const delta = touchStartX.current - touchEndX.current;

    if (delta > SWIPE_THRESHOLD) {
      // swiped left → next
      console.log("swipe left → next");
      setModalIndex((prev) => (prev + 1) % imageUrls.length);
    } else if (delta < -SWIPE_THRESHOLD) {
      // swiped right → previous
      console.log("swipe right → prev");
      setModalIndex(
        (prev) => (prev + imageUrls.length - 1) % imageUrls.length
      );
    }
  };

  const PortfolioCard = ({
    index,
    data: { url },
  }: {
    index: number;
    data: { url: string };
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
    <main className="mt-40 sm:mt-30">
      <section className="h-50 flex flex-col justify-evenly items-center">
         <h2 className="text-3xl font-semibold">My Work</h2>
         <p className="text-lg">
           Explore my portfolio to see a range of my work
         </p>
       </section>

      <Masonry
        id="portfolio-container"
        items={imageUrls}
        render={PortfolioCard}
        columnGutter={12}
        columnWidth={400}
        overscanBy={10000}
      />

      {/* Modal overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          showModal ? "flex" : "hidden"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left arrow (hidden on mobile) */}
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
          className="hidden sm:block size-20 select-none rounded-full bg-black/30 fixed left-[5%] top-1/2 text-[96px] text-gray-300 transform -translate-y-1/2 hover:-translate-x-5 transition cursor-pointer z-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>

        {/* Modal Background + Image */}
        <div
          className="modal-content absolute w-screen h-screen bg-black sm:bg-gray-900/50 flex items-center justify-center -z-10"
          onClick={() => setShowModal(false)}
        >
          <img
            className="w-screen sm:max-w-[95vw] h-screen sm:max-h-[95vh] object-contain"
            alt=""
            src={imageUrls[modalIndex]?.url}
          />
        </div>

        {/* Close button */}
        <svg
          onClick={() => setShowModal(false)}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-10 select-none rounded-full bg-black/30 fixed right-[5%] top-[10%] text-white transform -translate-y-1/2 hover:rotate-180 transition duration-300 cursor-pointer z-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

        {/* Right arrow (hidden on mobile) */}
        <svg
          onClick={() => {
            console.log("increasing image element index");
            setModalIndex((prev) => (prev + 1) % imageUrls.length);
          }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="hidden sm:block size-20 select-none rounded-full bg-black/30 fixed right-[5%] top-1/2 text-[96px] text-white -translate-y-1/2 hover:translate-x-5 transition cursor-pointer z-20"
        >
          <path
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
