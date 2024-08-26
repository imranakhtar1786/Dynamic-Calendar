
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Week_view from './Components/Week_view'
import {useEffect, useRef, useState } from 'react';

export default function App() {
  const today = new Date();
  const isoDate = today.toISOString();
  const fetchEventsForWeek = async () => {
    const url = `http://127.0.0.1:8000/events/view/day/?date=${encodeURIComponent(isoDate)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json(); // Handle the data from the response
      alert(`Reminder: ${data.length} Event are scheduled today!`);

    } catch (error) {
      console.error('Error:', error);  // Handle any errors
    }
  };
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Initialize the state with current date and generated calendar
  const currentDate = new Date();
  const initialMonth = currentDate.getMonth(); // Get the month (0-11)
  const initialYear = currentDate.getFullYear();
  const [calendarData, setCalendarData] = useState({
    showDate: `${monthNames[initialMonth]} ${initialYear}`,
    calendar: generateFullCalendar(monthNames[initialMonth], initialYear),
    currentYear: initialYear,
    currentMonth: initialMonth
  });

  useEffect(()=>{
    fetchEventsForWeek()
  },[])

  const dateRef = useRef({
    year: initialYear,
    month: monthNames[initialMonth]
  });

  function generateFullCalendar(monthName, year) {
    const monthIndex = monthNames.indexOf(monthName);
    if (monthIndex === -1) return;

    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const lastDay = new Date(year, monthIndex, daysInMonth).getDay();

    let calendar = [];
    let week = new Array(7).fill(null);

    // Previous month's days (if any)
    let prevMonthDate = new Date(year, monthIndex, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      week[i] = prevMonthDate--;
    }

    // Current month's days
    let currentDay = 1;
    for (let i = firstDay; i < daysInWeek.length; i++) {
      week[i] = currentDay++;
    }
    calendar.push(week);

    // Rest of the weeks in the current month
    while (currentDay <= daysInMonth) {
      week = new Array(7).fill(null);
      for (let i = 0; i < daysInWeek.length; i++) {
        if (currentDay <= daysInMonth) {
          week[i] = currentDay++;
        }
      }
      calendar.push(week);
    }

    // Next month's days (if any)
    let nextMonthDay = 1;
    if (lastDay < 6) {
      for (let i = lastDay + 1; i < daysInWeek.length; i++) {
          week[i] = nextMonthDay++;
      }
    }
    return {calendar:calendar,firstDayIndex:firstDay,lastDayIndex:lastDay};
  }

  function changeMonth(direction) {
    const { currentYear, currentMonth } = calendarData;

    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    // Adjust the year if necessary
    if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11; // December
      newYear -= 1;
    }

    // Update the state and reference with the new year and month
    const newMonthName = monthNames[newMonth];
    dateRef.current = { year: newYear, month: newMonthName };

    setCalendarData({
      showDate: `${newMonthName} ${newYear}`,
      calendar: generateFullCalendar(newMonthName, newYear),
      currentYear: newYear,
      currentMonth: newMonth
    });
  }

  return (
    <>
      <BrowserRouter>
        <Navbar dateRef={dateRef} changeMonth={changeMonth} getShow_date={calendarData.showDate} />
        <Routes>
          <Route path='/' element={<Home changeMonth={changeMonth} getShow_date={calendarData.showDate} calendar={calendarData.calendar} />} />
          <Route path='/week-view' element={<Week_view changeMonth={changeMonth} getShow_date={calendarData.showDate} calendar={calendarData.calendar} view={"week"}/>} />
          <Route path='/day-view' element={<Week_view changeMonth={changeMonth} getShow_date={calendarData.showDate} calendar={calendarData.calendar} view={"day"}/>} />
          <Route path='/schedule' element={<Week_view changeMonth={changeMonth} getShow_date={calendarData.showDate} calendar={calendarData.calendar} view={"month"}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

