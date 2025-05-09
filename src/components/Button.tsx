export function InvestmentButton({
  text = "",
  func = () => {},
  className = ""
}: {
  text: string;
  func: () => void;
  className?: string;
  // x?: number;
  // y?: number;
}) {
  return (
    <button className={`cursor-pointer group py-4 px-6 w-fit text-black bg-transparent rounded-md flex flex-row ${className}`} onClick={func}>
        <span className="mr-1">{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 relative left-0 group-hover:left-2 transition-all duration-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
}
