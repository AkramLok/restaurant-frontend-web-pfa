import React, { useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import icon from "../assets/icons/geolocalisation/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import L object from Leaflet library
import "leaflet/dist/leaflet.css";

const GeoLocation = ({ onLocationChange }) => {
  const [position, setPosition] = useState([33.5656, -7.6]);
  const [zoom] = useState(17);
  const [search, setSearch] = useState(null);
  const [address, setAddress] = useState("");

  const handleMapClick = async (event) => {
    const { latlng } = event;
    setSearch(latlng);
    // Update the marker position with the clicked coordinates
    setPosition([latlng.lat, latlng.lng]);
    // Invoke the callback function with the coordinates
    const location = { latitude: latlng.lat, longitude: latlng.lng };
    onLocationChange(location);

    // Fetch address using reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
    );
    const data = await response.json();
    setAddress(data.display_name);
  };

  const customIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [12, 41], // Adjust the anchor point to the center bottom of the icon
  });

  return (
    <div>
      {search && (
        <h3 className="mb-3">
          {/*Coordinates: {search.lat}, {search.lng}<br />*/}
          Address: {address}
        </h3>
      )}
      <Map
        onClick={handleMapClick}
        center={position}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <ReactLeafletSearch
          position="topright"
          showPopup={false}
          provider="OpenStreetMap"
          showMarker={true}
          openSearchOnLoad={true}
          closeResultsOnClick={true}
          providerOptions={{ region: "np" }}
        />
        {/* Use the position state to dynamically update the marker position */}
        <Marker position={position} icon={customIcon} />
      </Map>
    </div>
  );
};

export default GeoLocation;
