import SmallCalender from "./SmallCalender"
import Input_con from "./Input_con"
import { useEffect, useState } from "react"
export default function Home(props) {
  let [input_Tab, setInput_Tab] = useState('Task')
  
  const [isVisible, setIsVisible] = useState(false);
  const [input_Date, setInput_Date] = useState('0000-00-00T00:00');
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"

  ];
  let setDate = (a) => {
    setInput_Date(a)
    setIsVisible(true)
  }

  useEffect(() => {
    let div = document.getElementsByClassName("block")
    for (let i = 0; i < div.length; i++) {
      let curret_month = monthNames.indexOf(props.getShow_date.split(" ")[0]) + 1
      let current_date = div[i].textContent
      if (current_date.length > 2) {
        current_date = current_date.slice(3)
      }
      if (current_date < 10) {
        current_date = "0" + current_date
      }
      if (curret_month < 9) {
        curret_month = "0" + curret_month
      }
      div[i].style.color = "normal";
      div[i].style.fontWeight = "normal";
      if (i >= props.calendar.firstDayIndex && i <= div.length - 7 + props.calendar.lastDayIndex) {
        div[i].onclick = () => setDate(`${props.getShow_date.split(" ")[1]}-${curret_month}-${current_date}T00:00`)
        if (i == 0 || i == 7 || i == 14 || i == 21 || i == 28) {
          div[i].style.color = "black";
          div[i].style.fontWeight = "bold";
        }
      }
      if (i < div.length && i > div.length - 7 + props.calendar.lastDayIndex) {
        if (curret_month == 12) {
          div[i].onclick = () => setDate(`${parseInt(props.getShow_date.split(" ")[1]) + 1}-${"01"}-${current_date}T00:00`)
        }
        else {
          div[i].onclick = () => setDate(`${props.getShow_date.split(" ")[1]}-${(parseInt(curret_month) + 1).toString().padStart(2, '0')}-${current_date}T00:00`)
        }
      }
    }
  }, [props.getShow_date])

  let input_click = (inp, active) => {
    setInput_Date('0000-00-00T00:00')
    setIsVisible(inp)
    setInput_Tab(active)
  }
  return (
    <>
      <div className="container">
        <div className="cont-item" id="cont-item1"><SmallCalender getShow_date={props.getShow_date} changeMonth={props.changeMonth} calendar={props.calendar} input_click={input_click} /></div>
        <div className="cont-item" id="cont-item2">
          {props.calendar.calendar.map((week, weekIndex) => (
            week.map((day, dayIndex) => (
              <div className="block" key={`${weekIndex}-${dayIndex}`}>
                {weekIndex === 0 && <><br />{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex]}<br /></>}
                {weekIndex > 0 && <><br /></>}
                {day}
              </div>
            ))
          ))}
        </div>
      </div>
      {isVisible && (
        <Input_con setIs={() => setIsVisible(false)} input_Tab={input_Tab} input_Date={input_Date} />
      )}
    </>
  )
}
