const AddToYourStay = ({
  airportShuttle,
  rentalCar,
  taxiShuttle,
  specialRequest,
  handleCheckboxChange,
  handleSpecialRequestChange,
}) => {
  return (
    <div className="add-to-stay-container" style={styles.container}>
      <h3>Add to your stay</h3>
      <div style={styles.checkboxSection}>
        <label>
          <input
            type="checkbox"
            checked={airportShuttle}
            onChange={(e) => handleCheckboxChange(e, "airportShuttle")}
          />
          I'm interested in requesting an airport shuttle
        </label>
        <p style={styles.description}>
          We’ll tell your accommodation that you’re interested so they can
          provide details and costs.
        </p>
      </div>
      <div style={styles.checkboxSection}>
        <label>
          <input
            type="checkbox"
            checked={rentalCar}
            onChange={(e) => handleCheckboxChange(e, "rentalCar")}
          />
          I'm interested in renting a car with 10% off
        </label>
        <p style={styles.description}>
          Save 10% on all rental cars when you book with us – we'll add car hire
          options in your booking confirmation.
        </p>
      </div>
      <div style={styles.checkboxSection}>
        <label>
          <input
            type="checkbox"
            checked={taxiShuttle}
            onChange={(e) => handleCheckboxChange(e, "taxiShuttle")}
          />
          Want to book a taxi or shuttle ride in advance?
        </label>
        <p style={styles.description}>
          Avoid surprises – get from the airport to your accommodation without a
          hitch. We’ll add taxi options to your booking confirmation.
        </p>
      </div>

      <h3>Special requests</h3>
      <p style={styles.description}>
        Special requests cannot be guaranteed – but the property will do its
        best to meet your needs. You can always make a special request after
        your booking is complete!
      </p>
      <div>
        <label htmlFor="special-request">
          Please write your requests in English or Vietnamese. (optional)
        </label>
        <textarea
          id="special-request"
          value={specialRequest}
          onChange={handleSpecialRequestChange}
          style={styles.textarea}
        />
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  },
  checkboxSection: {
    marginBottom: "15px",
  },
  description: {
    marginTop: "5px",
    color: "#666",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    margin: "10px -10px",
  },
};

export default AddToYourStay;
