import React, { useEffect, useState, useRef } from "react";

const LocationAutocomplete = ({ searchText, onResults }) => {
  const [error, setError] = useState(null);
  const prevSearchTextRef = useRef("");

  useEffect(() => {
    const fetchAutocompleteResults = async () => {
      const requestOptions = {
        method: "GET",
      };

      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            searchText
          )}&apiKey=6efd91fd8d144be8893d5d9300df7630`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        onResults(result.features);
      } catch (error) {
        setError(error.message);
        console.log("error", error);
      }
    };

    if (searchText && prevSearchTextRef.current !== searchText) {
      fetchAutocompleteResults();
    }

    prevSearchTextRef.current = searchText; // Update the previous search text
  }, [searchText, onResults]);
};

export default LocationAutocomplete;
