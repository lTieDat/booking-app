import React, { useState, useRef } from "react";
import { AutoComplete, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import LocationAutocomplete from "../CustomHook/LocationAutoComplete";
import "./style.scss";

const LocationOption = ({ setLocation, location }) => {
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState("");
  const lastSearchTextRef = useRef(""); // Ref to store the last search text
  const handleAutocompleteResults = (results) => {
    const suggestions = results.map((feature) => ({
      value: feature.properties.formatted,
      city: feature.properties.city,
      country: feature.properties.country,
      geometry: feature.geometry.coordinates,
      state: feature.properties.state || "",
      id: feature.properties.place_id,
    }));
    setOptions(suggestions);
  };

  const handleSearch = (value) => {
    setUserInput(value); // Capture the user input
    // Only proceed if input is significant and differs from the last search
    if (value.length > 3 && value !== lastSearchTextRef.current) {
      lastSearchTextRef.current = value; // Update the last search text
    } else if (value.length <= 3) {
      setOptions([]); // Clear options if input is too short
    }
  };

  const handleSelect = (value) => {
    // Find the selected option
    const selectedOption = options.find((option) => option.value === value);

    // Set location with city, country, and geometry
    if (selectedOption) {
      setLocation({
        address: selectedOption.value,
        city: selectedOption.city,
        country: selectedOption.country,
        state: selectedOption.state,
        county: selectedOption.county,
        geometry: {
          lat: selectedOption.geometry[1],
          lng: selectedOption.geometry[0],
        },
      });
    }

    setUserInput(""); // Clear the input when a location is selected
  };

  return (
    <div>
      <LocationAutocomplete
        searchText={userInput}
        onResults={handleAutocompleteResults}
      />
      <AutoComplete
        popupClassName="custom-dropdown"
        style={{ width: 300 }}
        onSearch={handleSearch}
        onSelect={handleSelect}
        placeholder="Where are you going?"
        options={options}
      >
        <Input prefix={<EnvironmentOutlined />} value={userInput} />
      </AutoComplete>
    </div>
  );
};

export default LocationOption;
