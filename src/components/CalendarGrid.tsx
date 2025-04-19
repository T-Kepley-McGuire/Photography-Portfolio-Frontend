import { useEffect, useRef, useState } from "react";
import TimeslotInsert from "./TimeslotInsert";
import CalendarItem from "./CalendarItem";
import { CustomDate, Timeslot } from "../pages/Booking";

// export type CustomDate = {
//   year: number;
//   month: string;
//   day: number;
// };

export type DateData = {
  date: CustomDate;
  data: {
    gridArea: string;
    isPast: boolean;
    today: boolean;
    isMonth: boolean;
    rowNumber: number;
  };
};

// export enum TimeOfDay {
//   Morning = "Morning",
//   Afternoon = "Afternoon",
//   Evening = "Evening",
// }

// export type Timeslot = {
//   date: CustomDate;
//   morning: boolean;
//   afternoon: boolean;
//   evening: boolean;
// };

type CalendarGridProps = {
    selectedTimeslots: Timeslot[];
    setSelectedTimeslots: React.Dispatch<React.SetStateAction<Timeslot[]>>;
}

export default function CalendarGrid({selectedTimeslots, setSelectedTimeslots}: CalendarGridProps) {
  const todayRef = useRef<HTMLDivElement>(null);
  const yearNameRef = useRef<HTMLDivElement>(null);

  const [gridDates, setGridDates] = useState<Array<DateData>>([]);

  const noDate = { year: 0, month: "", day: 0 };
  const [opened, setOpened] = useState<DateData["date"]>(noDate);

//   const [selectedTimeslots, setSelectedTimeslots] = useState<Timeslot[]>([]);

  const setSelection = (date: CustomDate) => {
    return (morning: boolean, afternoon: boolean, evening: boolean) => {
      let foundInTimeslots = false;
      const newTimeslots = selectedTimeslots.map((timeslot) => {
        if (timeslot.date == date) {
          timeslot.morning = morning;
          timeslot.afternoon = afternoon;
          timeslot.evening = evening;
          foundInTimeslots = true;
        }
        return timeslot;
      });
      if (!foundInTimeslots && selectedTimeslots.length < 3)
        newTimeslots.push({
          date: date,
          morning: morning,
          afternoon: afternoon,
          evening: evening,
        });

      setSelectedTimeslots(
        newTimeslots.filter(
          (timeslot) =>
            timeslot.morning || timeslot.afternoon || timeslot.evening
        )
      );
    };
  };

  const getTimeslotSelection = (date: CustomDate) => {
    const selected = selectedTimeslots.filter(
      (timeslot) => timeslot.date == date
    )[0];
    if (selected != undefined) {
      return {
        morning: selected.morning,
        afternoon: selected.afternoon,
        evening: selected.evening,
      };
    } else return undefined;
  };

  const isSelected = (date: CustomDate) => {
    return selectedTimeslots.some(timeslot => timeslot.date == date);
  }

  useEffect(() => {
    const loadCalendar = () => {
      //   const datesList: DateInfo[] = [];
      const today = new Date();
      today.setDate(today.getDate() + 6);

      const beginningTodaysWeek = new Date();
      beginningTodaysWeek.setDate(today.getDate() - today.getDay());

      const beginningFourWeeksAgo = new Date();
      beginningFourWeeksAgo.setDate(beginningTodaysWeek.getDate() - 5 * 7);

      const endingLastWeek = new Date();
      endingLastWeek.setDate(beginningTodaysWeek.getDate() + 52 * 7 + 6);

      const workingDate = new Date(beginningFourWeeksAgo);
      //   const grid = gridRef.current;
      //   if (!grid) return;

      //   grid.innerHTML = "";
      const tempDates: DateData[] = [];
      for (let i = 0; i < 52 * 7 + 6 + 5 * 7; i++) {
        tempDates.push({
          date: {
            year: workingDate.getFullYear(),
            month: workingDate.toLocaleString("default", {
              month: "short",
            }),
            day: workingDate.getDate(),
          },
          data: {
            gridArea: `${1 + Math.floor(i / 7)} / ${2 + (i % 7)}`,
            isPast: workingDate.getTime() <= today.getTime(),
            today: workingDate.toDateString() === today.toDateString(),
            isMonth: false,
            rowNumber: 1 + Math.floor(i / 7),
          },
        });
        const weekStart = new Date(workingDate);
        const weekEnd = new Date(workingDate);
        weekStart.setDate(workingDate.getDate() - workingDate.getDay());
        weekEnd.setDate(workingDate.getDate() - workingDate.getDay() + 6);

        const beginningWeekOfMonth = workingDate.getDate() === 1;
        if (beginningWeekOfMonth || i === 0) {
          const firstOfNextMonth = new Date(workingDate);
          firstOfNextMonth.setMonth(firstOfNextMonth.getMonth() + 1, 1);

          const lastFullWeekEnd = new Date(firstOfNextMonth);
          lastFullWeekEnd.setDate(
            firstOfNextMonth.getDate() - firstOfNextMonth.getDay() - 1
          );

          const numDaysIncl = Math.round(
            (lastFullWeekEnd.getTime() -
              weekStart.getTime() +
              1000 * 60 * 60 * 24) /
              (1000 * 60 * 60 * 24)
          );
          const numWeeks = Math.floor(numDaysIncl / 7);

          tempDates.push({
            date: {
              year: weekEnd.getFullYear(),
              month: weekEnd.toLocaleString("default", {
                month: "short",
              }),
              day: 0,
            },
            data: {
              gridArea: `${1 + Math.floor(i / 7)} / 1 / ${
                1 + Math.floor(i / 7) + numWeeks
              }`,
              isPast: false,
              today: false,
              isMonth: true,
              rowNumber: 1 + Math.floor(i / 7),
            },
          });
        }
        workingDate.setDate(workingDate.getDate() + 1);
      }
      setGridDates(tempDates);

      if (yearNameRef.current) {
        yearNameRef.current.innerText = today.getFullYear().toString();
      }
    };

    loadCalendar();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (todayRef.current) {
        todayRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 100);
  }, [todayRef]);

  return (
    <div className="mx-auto items-center flex flex-col justify-center">
      <div className="calendar-intersection-window"></div>

      {/* Grid Header */}
      <div className="w-[320px] text-sm sm:text-base sm:w-[355px] grid grid-cols-8 border-b">
        <div
          id="calendar-year-name"
          ref={yearNameRef}
          className="font-bold text-center col-start-1 row-start-1"
        ></div>

        {["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"].map((day, idx) => (
          <div
            key={idx}
            className="text-center col-start-[2] row-start-1"
            style={{ gridArea: `1 / ${2 + idx}` }}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        className="relative h-[235px] sm:h-[268px] overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        <div id="calendar-grid" className="grid">
          {gridDates.map((dateData) => (
            <>
              <CalendarItem
                dateData={dateData}
                opened={opened}
                setOpened={setOpened}
                reference={todayRef}
                isSelected={isSelected(dateData.date)}
              />

              {opened === dateData.date && (
                <div
                  className="relative top-[50%] mt-[1px] sm:mt-1 z-0 t-[100%] h-[35px] text-sm right-0"
                  style={{
                    gridRow: `${dateData.data.rowNumber}`,
                    gridColumn: "2/9",
                  }}
                >
                  <TimeslotInsert
                    selected={getTimeslotSelection(dateData.date)}
                    setTimeslotSelection={setSelection(dateData.date)}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
