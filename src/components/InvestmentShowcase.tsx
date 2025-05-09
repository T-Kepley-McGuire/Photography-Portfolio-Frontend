import React, { useState } from "react";

export type InvestmentItem = {
  id: number; // Unique ID for React key and tracking
  url: string;
  alt?: string;
  x: number;
  y: number;
  scale?: number;
};

type InvestmentShowcaseProps = {
  initialImages: InvestmentItem[];
};

export const InvestmentShowcase: React.FC<InvestmentShowcaseProps> = ({
  initialImages,
}) => {
  const [images, setImages] = useState<InvestmentItem[]>(initialImages);

  const handleImageClick = (id: number) => {
    setImages((prevImages) => {
      const clickedIndex = prevImages.findIndex((img) => img.id === id);
      if (clickedIndex === -1) return prevImages; // Fail-safe

      const clickedImage = prevImages[clickedIndex];
      const newImages = [
        clickedImage,
        ...prevImages.slice(0, clickedIndex),
        ...prevImages.slice(clickedIndex + 1),
      ];
      return newImages;
    });
  };
  // const rightMostPx = initialImages.reduce((prevMaxRight, investImg) => investImg.x + (investImg.scale || 1) > prevMaxRight.x + (prevMaxRight.scale || 1) ? investImg : prevMaxRight);
  return (
    <div className="w-full h-[80vh] p-5">
      {images.map((image, index) => (
        <img
        key={image.id}
        onClick={() => handleImageClick(image.id)}
        className={`absolute object-cover cursor-pointer rounded-md transition-transform duration-300  hover:scale-110 ${index === 0 ? "scale-110" : "scale-100"} shadow-2xl`}
        style={{
            height: `${image.scale ? 400 * image.scale : 400}px`,
          left: image.x,
          top: image.y,
          zIndex: images.length - index,
        }}
        src={image.url}
        alt={image.alt}
      />
      ))}
    </div>
  );
};
