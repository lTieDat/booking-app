const ArrivalTime = ({ arrivalTime, handleTimeChange }) => {
  return (
    <div className="arrival-time-container" style={styles.container}>
      <h3>Your arrival time</h3>
      <div style={styles.checkIn}>
        <span style={styles.icon}>✔</span> Early check-in from 13:00.
      </div>
      <div style={styles.frontDesk}>
        <span style={styles.icon}>👤</span> 24-hour front desk – Help whenever
        you need it!
      </div>
      <div style={styles.arrivalSelect}>
        <label htmlFor="arrival-time">
          Add your estimated arrival time <span style={styles.required}>*</span>
        </label>
        <select
          id="arrival-time"
          value={arrivalTime}
          onChange={handleTimeChange}
          style={styles.select}
        >
          <option value="Please select" disabled>
            {" "}
            Please select
          </option>
          <option value="I don't know yet">I don't know yet</option>
          <option value="00:00-02:00">00:00-02:00</option>
          <option value="02:00-04:00">02:00-04:00</option>
          <option value="04:00-06:00">04:00-06:00</option>
          <option value="06:00-08:00">06:00-08:00</option>
          <option value="08:00-10:00">08:00-10:00</option>
          <option value="10:00-12:00">10:00-12:00</option>
          <option value="12:00-14:00">12:00-14:00</option>
          <option value="14:00-16:00">14:00-16:00</option>
          <option value="16:00-18:00">16:00-18:00</option>
          <option value="18:00-20:00">18:00-20:00</option>
          <option value="20:00-22:00">20:00-22:00</option>
          <option value="22:00-00:00">22:00-00:00</option>
        </select>
      </div>
      <p style={styles.timezone}>Time is for Ho Chi Minh City time zone</p>
    </div>
  );
};

// Basic inline styling
const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    marginBottom: "10px",
  },
  checkIn: {
    marginBottom: "10px",
  },
  frontDesk: {
    marginBottom: "20px",
  },
  icon: {
    color: "green",
    marginRight: "10px",
  },
  arrivalSelect: {
    marginBottom: "10px",
  },
  required: {
    color: "red",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    borderColor: "#ccc",
  },
  timezone: {
    color: "#666",
    fontSize: "12px",
  },
};

export default ArrivalTime;
