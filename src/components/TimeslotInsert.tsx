type TimeslotInsertProps = {
  selected?: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  setTimeslotSelection: (
    morning: boolean,
    afternoon: boolean,
    evening: boolean
  ) => void;
};

export default function TimeslotInsert({
  selected = { morning: false, afternoon: false, evening: false },
  setTimeslotSelection, 
}: TimeslotInsertProps) {

  return (
    <div key="unique" className="w-full h-full flex flex-row justify-around items-center">
      <div
        onClick={() =>
          setTimeslotSelection(
            !selected.morning,
            selected.afternoon,
            selected.evening
          )
        }
        className={`cursor-pointer bg-mygreen-100 rounded-md py-2 px-1 border-2 transition-all duration-300 ${
          selected.morning ? "border-mygreen-700" : "border-transparent"
        }`}
      >
        Morning
      </div>
      <div
        onClick={() =>
          setTimeslotSelection(
            selected.morning,
            !selected.afternoon,
            selected.evening
          )
        }
        className={`cursor-pointer bg-mygreen-100 rounded-md py-2 px-1 border-2 transition-all duration-300 ${
          selected.afternoon ? "border-mygreen-700" : "border-transparent"
        }`}
      >
        Afternoon
      </div>
      <div
        onClick={() =>
          setTimeslotSelection(
            selected.morning,
            selected.afternoon,
            !selected.evening
          )
        }
        className={`cursor-pointer bg-mygreen-100 rounded-md py-2 px-1 border-2 transition-all duration-300 ${
          selected.evening ? "border-mygreen-700" : "border-transparent"
        }`}
      >
        Evening
      </div>
    </div>
  );
}
