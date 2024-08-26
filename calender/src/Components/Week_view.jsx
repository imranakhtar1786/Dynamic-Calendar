import SmallCalender from "./SmallCalender"
import Input_con from "./Input_con";
import { useEffect, useState } from "react";
export default function Week_view(props) {
    let [input_type, setInput_type] = useState('Task')
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    let input_click = (inp, active) => {
        setIsVisible(inp)
        setInput_type(active)
    }
    function edit_data(a) {
        // alert(a)
    }
    async function delete_data(a) {
        const url = `http://localhost:8000/events/${a}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            fetchEventsForWeek()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const fetchEventsForWeek = async () => {
        const today = new Date();
        const isoDate = today.toISOString();
        const url = `http://127.0.0.1:8000/events/view/${props.view}/?date=${encodeURIComponent(isoDate)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json(); // Handle the data from the response
            setData(data)
        } catch (error) {
            console.error('Error:', error);  // Handle any errors
        }
    };
    useEffect(() => {
        fetchEventsForWeek()
    }, [props.view,isVisible])
    return (
        <>
            <div className="container">
                <div className="cont-item" id="cont-item1"><SmallCalender getShow_date={props.getShow_date} changeMonth={props.changeMonth} calendar={props.calendar} input_click={input_click}/></div>
                <div className="cont-item cont-item2" id="" >
                    {data.map((item) => (
                        <div key={item.id} className="inner-cont-item2">
                            <input type="hidden" value={item.id} />
                            <p style={{ fontSize: "16px",}} className="p1">
                                {new Date(item.reminder_Time).toISOString().split('T')[0]}
                            </p>
                            <p className="p3">
                                {item.reminder_Time.split('T')[1]}
                            </p>
                            {item.event_Type === "Task" && (
                                <p style={{ background: "brown" }} className="p4">
                                    {item.description}
                                </p>
                            )}
                            {item.event_Type === "Meeting" && (
                                <p style={{ background: "#4CAF50" }} className="p4">
                                    {item.description}
                                </p>
                            )}
                            {item.event_Type === "Calling" && (
                                <p style={{ background: "rgb(23, 152, 232)" }} className="p4">
                                    {item.description}
                                </p>
                            )}
                            <a style={{ cursor: "pointer" }} onClick={() => edit_data(item.id)}>&#9998;</a>
                            <a style={{ cursor: "pointer" }} onClick={() => delete_data(item.id)}>&#10060;</a>
                        </div>
                    ))}
                </div>
            </div>
            {isVisible && (
                <Input_con setIs={() => setIsVisible(false)} input_type={input_type} input_Tab={input_type}/>
            )}
        </>
    )
}
