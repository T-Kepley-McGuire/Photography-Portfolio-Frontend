import { Ref } from "react";
import { CustomDate } from "../pages/Booking";
import { DateData } from "./CalendarGrid";
type CalendarItemProps = {
  dateData: DateData;
  opened: CustomDate;
  reference: Ref<HTMLDivElement>;
  isSelected: boolean;
  setOpened: (value: CustomDate) => void;
};

export default function CalendarItem({
  dateData,
  opened,
  reference,
  isSelected,
  setOpened,
}: CalendarItemProps) {
  const noDate = { year: 0, month: "", day: 0 };
  return (
    <div
        key={""+dateData.date.day+dateData.date.month+dateData.date.year}
      ref={dateData.data.today ? reference : undefined}
      className={`snap-start scroll-m-1 text-center w-[35px] sm:w-[40px] transition-all duration-300 ${
        dateData.data.isMonth
          ? ""
          : `h-[35px] sm:h-[40px] ${
              dateData.data.isPast
                ? "bg-gray-400"
                : "cursor-pointer bg-gray-200 hover:-translate-y-[3px] hover:shadow-lg"
            }`
      } rounded-md m-[2px] border-2 ${
        opened === dateData.date
          ? "mb-[45px] border-green-700"
          : isSelected ? "border-gray-500" : "border-transparent"
      }`}
      style={{ gridArea: dateData.data.gridArea }}
      onClick={() => {
        if (!dateData.data.isPast)
          if (opened === dateData.date) setOpened(noDate);
          else setOpened(dateData.date);
      }}
    >
      {dateData.data.isMonth ? dateData.date.month : dateData.date.day}
    </div>
  );
}
