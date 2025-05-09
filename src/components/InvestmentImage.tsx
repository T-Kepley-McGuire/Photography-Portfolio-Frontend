export default function InvestmentImage({
  url,
  alt = "n/a",
  x,
  y,
}: {
  url: string;
  alt?: string;
  x: number;
  y: number;
}) {
    return <img
                  className={`absolute top-[calc(${x}px+50%)] left-[calc(${y}px+50%)] object-cover translate-x-[-50%] translate-y-[-50%] rounded-md`}
                  src={url}
                  alt={alt}
                /> 
}
