import {  useState } from 'react';

function Input_con(props) {
  const [activeTab, setActiveTab] = useState(props.input_Tab);
  const [title, setTitle] = useState('');
  const [reminderTime, setReminderTime] = useState(props.input_Date);
  const [description, setDescription] = useState('');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddClick = async() => {
    try {
      const response = await fetch("http://localhost:8000/events", {
        method: 'POST', // Method type
        headers: {
          'Content-Type': 'application/json' // Sending JSON data
        },
        body: JSON.stringify({
          title: title,
          reminder_Time: reminderTime,
          description: description,
          event_Type:activeTab,
          recurring:false,
        }) // Convert data to JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Parse the JSON response
      props.setIs(false)
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error so it can be handled elsewhere
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cross} onClick={props.setIs} > &#10006;</div>
      <div style={styles.tabs}>
        <button
          style={activeTab === 'Task' ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick('Task')}
        >
          Task
        </button>
        <button
          style={activeTab === 'Calling' ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick('Calling')}
        >
          Calling
        </button>
        <button
          style={activeTab === 'Meeting' ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick('Meeting')}
        >
          Meeting
        </button>
      </div>
      <div style={styles.form}>
        {/* Render the Title input only for the Task tab */}
        {activeTab === 'Task' && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        )}

        {/* Reminder Time input */}
        <div style={styles.inputGroup}>
          <input
            required
            type="datetime-local"
            placeholder={activeTab === 'Task' ? "10-01-2024 00:00" : "Select Reminder time"}
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            onFocus={(e) => e.target.showPicker()}
            style={styles.input}
          />
        </div>

        {/* Description input */}
        <textarea
          required
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        ></textarea>

        {/* Add button */}
        <button onClick={handleAddClick} style={styles.addButton}>
          Add
        </button>
      </div>
    </div>
  );
}
const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    width: '50vw',
    height: "50vh",
    backgroundColor: '#fff',
    position: "absolute",
    top: "20%",
    left: "20%"
  },
  cross: {
    position: "absolute",
    top: "5px",
    right: "10px",
    color: "red",
    cursor: "pointer",
    userSelect: "none"
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    outline: 'none',
  },
  activeTab: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  icon: {
    marginRight: '10px',
  },
  input: {
    padding: '10px',
    flex: 1,
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    height: '40px',
  },
  addButton: {
    width: "10%",
    marginLeft: "90%",
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Input_con;
