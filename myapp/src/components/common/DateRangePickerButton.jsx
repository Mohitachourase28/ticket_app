/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { FaCalendar } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export const DateRangePickerButton = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="border border-gray-300 px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100"
      >
        <FaCalendar className="text-blue-600" />
        Date Range
      </button>

      {showPicker && (
        <div className="absolute z-10 mt-2 shadow-lg scale-90 origin-top-left">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePickerButton;
