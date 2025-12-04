import React, { SetStateAction, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function DatePickers({handleColor, selectedDateTime, setSelectedDateTime}) {

    
  return (
    <div>
         <DatePicker
        showTimeSelect
         selected={selectedDateTime}
          onChange={setSelectedDateTime}
      dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

    </div>
  )
}

export default DatePickers