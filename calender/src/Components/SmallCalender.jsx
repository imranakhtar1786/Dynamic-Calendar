import { useEffect } from "react";

export default function SmallCalender(props) {
    useEffect(() => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let td = document.getElementsByClassName("td")
        const currentDate = new Date();
        for (let i = 0; i < td.length; i++) {
            td[i].style.color = " #424141"
            td[i].style.fontWeight = "normal";
            td[i].style.fontSize = "13px"
            td[i].style.backgroundColor = "white"
            td[i].style.border = "none"
            td[i].style.borderRadius = ""
            if (i % 7 == 0) {
                td[i].style.fontWeight = "bolder";
            }
            if (i >= 0 && i < props.calendar.firstDayIndex) {
                td[i].style.color = "rgb(204, 201, 201)"
                td[i].style.fontWeight = "normal";
                td[i].onclick = () => props.changeMonth(-1);
            }
            if (i > td.length - 7 + props.calendar.lastDayIndex && i < td.length) {
                td[i].style.color = "rgb(204, 201, 201)"
                td[i].style.fontWeight = "normal";
                td[i].onclick = () => props.changeMonth(1);
            }
            if (i === props.calendar.firstDayIndex + currentDate.getDate() - 1 && props.getShow_date == `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`) {
                td[i].style.backgroundColor = "rgb(166, 201, 231)"
                td[i].style.border = ".5px solid rgb(166, 201, 231)"
                td[i].style.borderRadius = "50%"
            }
        }
    }, [props.calendar.firstDayIndex, props.calendar.lastDayIndex])
    return (
        <>
            <div className="upper-layer">
                Create
                <div className="onhover">
                    <div className="arrow-up"></div>
                    <a className="hover-item" onClick={() => props.input_click(true, 'Task')}>Task</a>
                    <a className="hover-item" onClick={() => props.input_click(true, 'Meeting')}>Meeting</a>
                    <a className="hover-item" onClick={() => props.input_click(true, 'Calling')}>Calling</a>
                </div>
            </div>
            <div className="upper-layer1">
                <div className="upper-layer-item" id="upper-layer1">{props.getShow_date}</div>
                <div className="upper-layer-item" id="upper-layer2"><a onClick={() => props.changeMonth(+1)}>&gt;</a></div>
                <div className="upper-layer-item" id="upper-layer3"><a onClick={() => props.changeMonth(-1)}>&lt;</a></div>
            </div>
            <div className="upper-layer2">
                <table>
                    <thead>
                        <tr style={{ color: 'black', fontWeight: "bold", fontSize: "13px" }}>
                            <td>Su</td>
                            <td>Mo</td>
                            <td>Tu</td>
                            <td>We</td>
                            <td>Th</td>
                            <td>Fr</td>
                            <td>Sa</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.calendar.calendar.map((week, weekIndex) => (
                            <tr key={weekIndex}>
                                {week.map((day, dayIndex) => (
                                    <td key={dayIndex} className="td">
                                        {day}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="upper-layer3">
                <select name="" id="">
                    <option>Create New Account &nbsp;</option>
                    <option>Lorem, ipsum.&nbsp;</option>
                </select>
            </div>
            <p style={{ margin: "10px", fontWeight: "bold", userSelect: "none" }}>My Calenders</p>
            <div className="upper-layer4">
                <span style={{ color: "brown" }}>&#x2611; &nbsp;<span style={{ fontSize: "15px" }}>Task</span></span>
                <span style={{ fontWeight: "bolder", fontSize: "16px" }}>&#x2026;</span>
            </div>
            <div className="upper-layer4">
                <span style={{ color: "#4CAF50" }}>&#x2611; &nbsp;<span style={{ fontSize: "15px" }}>Metting</span></span>
                <span style={{ fontWeight: "bolder", fontSize: "16px" }}>&#x2026;</span>
            </div>
            <div className="upper-layer4">
                <span style={{ color: " rgb(23, 152, 232)" }}>&#x2611; &nbsp;<span style={{ fontSize: "15px" }}>Calling</span></span>
                <span style={{ fontWeight: "bolder", fontSize: "16px" }}>&#x2026;</span>
            </div>
        </>
    )
}
