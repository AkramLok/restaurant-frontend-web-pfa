import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import icon from "../../assets/icons/geolocalisation/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import L object from Leaflet library

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

        {/* Marker to indicate the specified location */}

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
    </div>
  );
};

export default GeoLocationShow;
