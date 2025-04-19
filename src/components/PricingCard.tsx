import { PricingOption } from "../pages/Booking";

type PricingCardProps = {
  option: PricingOption;
  selectedOptionId: string | null;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function PricingCard({
  option,
  selectedOptionId,
  setSelectedOptionId,
}: PricingCardProps) {
  return (
    <div
      key={option.id}
      className={`pricing-card max-w-[300px] max-h-[300px] cursor-pointer mx-auto my-5 bg-white rounded-[10px] border-4 transition-all duration-300 ease-in-out shadow-md p-5 text-center select-none 
          hover:-translate-y-[5px] hover:shadow-lg 
          ${
            selectedOptionId === option.id
              ? "border-green-700"
              : "border-transparent"
          }`}
      onClick={() =>
        setSelectedOptionId((prev) => (prev === option.id ? null : option.id))
      }
    >
      <h3 className="card-title text-[1.5em] font-semibold text-gray-900 mb-[15px]">
        {option.name}
      </h3>
      <p className="card-description text-[1em] text-gray-500 mb-[10px] leading-[1.5]">
        {option.description}
      </p>
      <p className="card-holdPrice text-[1em] text-gray-500 mb-[10px] leading-[1.5]">
        Hold Price: ${option.holdPrice.toFixed(2)}
      </p>
      <p className="card-price text-[2em] font-medium text-gray-900 mt-[15px]">
        Price: ${option.price.toFixed(2)}
      </p>
    </div>
  );
}
