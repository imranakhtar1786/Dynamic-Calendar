import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Navbar(props) {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(window.location.pathname);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        const value = event.target.value;
        navigate(value);
        
    }

    return (
        <>
            <div className="navbar">
                <div className="nav-item" id="nav-item1">Today</div>
                <div className="nav-item" id="nav-item2" onClick={() => props.changeMonth(-1)}>&lt;</div>
                <div className="nav-item" id="nav-item3" onClick={() => props.changeMonth(+1)}> &gt;</div>
                <div className="nav-item" id="nav-item4">{props.getShow_date !== "" ? props.getShow_date : props.dateRef.current.month + props.dateRef.current.year}</div>
                <div className="nav-item" id="nav-item5">
                    <select name="" onChange={handleChange} id='myDropdown' value={window.location.pathname}>
                        <option value="/day-view" style={{ fontWeight: selectedValue === '/day-view' ? 'bold' : 'normal' }}>Day_View</option>
                        <option value="/week-view" style={{ fontWeight: selectedValue === '/week-view' ? 'bold' : 'normal' }}>Week_View</option>
                        <option value="/schedule" style={{ fontWeight: selectedValue === '/schedule' ? 'bold' : 'normal' }}>Month_View</option>
                        <option value="/" style={{ fontWeight: selectedValue === '/' ? 'bold' : 'normal' }}>Calender_View</option>
                    </select>
                </div>
            </div>
        </>
    )
}
