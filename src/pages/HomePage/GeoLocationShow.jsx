import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import icon from "../../assets/icons/geolocalisation/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import L object from Leaflet library
import zIndex from "@mui/material/styles/zIndex";

const GeoLocationShow = ({ initialCoords }) => {
  const [position, setPosition] = useState(initialCoords);
  const [zoom] = useState(20);
  const [search, setSearch] = useState(null);
  const [address, setAddress] = useState("");

  // Update position when initialCoords change
  useEffect(() => {
    if (initialCoords) {
      setPosition(initialCoords);
    }
  }, [initialCoords]);

  const handleMapClick = async (event) => {
    const { latlng } = event;
    setSearch(latlng);

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
      <Map
        onClick={handleMapClick}
        center={position}
        zoom={zoom}
        style={{ height: "400px", width: "100%", zIndex: 1 }}
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
        <Marker position={position} icon={customIcon} />
      </Map>
      {search && (
        <h3 className="mb-3 text-gray-300 text-center">
          {/*Coordinates: {search.lat}, {search.lng}<br />*/}
          Address: {address}
        </h3>
      )}
    </div>
  );
};

export default GeoLocationShow;
