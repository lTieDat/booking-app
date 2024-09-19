import React, { useEffect } from "react";
import maplibregl, { Popup } from "maplibre-gl"; // Import maplibre-gl and Popup
import "maplibre-gl/dist/maplibre-gl.css"; // Import the MapLibre styles

const MapComponent = ({ lat, long }) => {
  useEffect(() => {
    // Function to initialize the map
    const initMap = () => {
      const map = new maplibregl.Map({
        container: "my-map", // The ID of the map container
        style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${process.env.REACT_APP_GOOGLE_API}`, // Use Geoapify map style
        center: [long, lat], // Set initial center to the given lat/long
        zoom: 14, // Set initial zoom level
      });

      // Function to add popup to the map
      const addPopup = (coordinates, address) => {
        new Popup().setLngLat(coordinates).setHTML(address).addTo(map);
      };

      // Fetch reverse geocoding data from Geoapify
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&type=street&lang=en&limit=1&format=json&apiKey=${process.env.REACT_APP_GOOGLE_API}`
          );
          const result = await response.json();
          const address = result.results[0].formatted;
          addPopup([long, lat], address);
        } catch (error) {
          console.error("Error fetching address:", error);
          addPopup([long, lat], "Error fetching address"); // Show error in popup
        }
      };

      // Fetch and display the address when map is initialized
      fetchAddress();
    };

    // Initialize the map after the component is mounted
    if (lat && long) {
      initMap();
    } else {
      console.error(
        "Latitude and Longitude are required to initialize the map"
      );
    }
  }, [lat, long]);

  return (
    <div>
      <div id="my-map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
