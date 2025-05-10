import { Ref } from "react";
import { CustomDate } from "../pages/Booking";
import { DateData } from "./CalendarGrid";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
type CalendarItemProps = {
  dateData: DateData;
  opened: CustomDate;
  reference?: Ref<HTMLDivElement>;
  isSelected: boolean;
  setOpened: (value: CustomDate) => void;
  setYear?: (value: String) => void;
};

export default function CalendarItem({
  dateData,
  opened,
  reference,
  isSelected,
  setOpened,
  setYear,
}: CalendarItemProps) {
  const noDate = { year: 0, month: "", day: 0 };
  let monthObserverRef = undefined;
  if (dateData.data.isMonth) {
    const { ref } = useIntersectionObserver(
      (ratio) => {
        if (ratio > 0.9 && setYear) {
          setYear("" + dateData.date.year);
        }
      },
      5
    );
    monthObserverRef = ref;
  }
  return (
    <div
      key={"" + dateData.date.day + dateData.date.month + dateData.date.year}
      ref={
        reference ? reference : monthObserverRef ? monthObserverRef : undefined
      }
      className={`snap-start scroll-m-1 text-center w-[35px] sm:w-[40px] transition-all duration-300 ${
        dateData.data.isMonth
          ? ""
          : `h-[35px] sm:h-[40px] ${
              dateData.data.isPast
                ? "bg-mygreen-400"
                : "cursor-pointer bg-mygreen-100 hover:-translate-y-[3px] hover:shadow-lg"
            }`
      } rounded-md m-[2px] border-2 ${
        opened === dateData.date
          ? "mb-[45px] border-mygreen-700"
          : isSelected
          ? "border-mygreen-400"
          : "border-transparent"
      }`}
      style={{ gridArea: dateData.data.gridArea }}
      onClick={() => {
        if (!dateData.data.isPast && !dateData.data.isMonth)
          if (opened === dateData.date) setOpened(noDate);
          else setOpened(dateData.date);
      }}
    >
      {dateData.data.isMonth ? dateData.date.month : dateData.date.day}
    </div>
  );
}
