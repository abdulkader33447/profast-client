// src/components/Coverage/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Optional: Adjust default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

import districts from "../../../public/warehouses.json";
import { useRef, useState } from "react";

const FlyToDistrict = ({ target }) => {
  const map = useMap();
  if (target) {
    map.flyTo([target.latitude, target.longitude], 13, {
      animate: true,
      duration: 1.5,
      easeLinearity: 2.25,
    });
  }
  return null;
};

const MapView = () => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const markerRefs = useRef([]);

  const handleSearch = () => {
    const found = districts.find((d) =>
      d.district.toLowerCase().includes(search.toLowerCase())
    );
    if (found) {
      setSelectedDistrict(found);

      // popup open
      const index = districts.indexOf(found);
      const marker = markerRefs.current[index];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const position = [23.8103, 90.4125]; // Dhaka, Bangladesh

  return (
    <div>
      {/* 🔍 Search Box */}
      <div className="my-4 ml-1  flex items-center gap-2">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Go
        </button>
      </div>
      <div className=" w-full h-[700px] rounded-xl overflow-hidden shadow-lg">
        {/* 🗺️ Map */}
        <MapContainer center={position} zoom={7} className="h-full w-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* ✈️ Fly to selected district */}
          <FlyToDistrict target={selectedDistrict} />

          {/* 📍 Markers for all districts */}
          {districts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
              ref={(ref) => (markerRefs.current[index] = ref)}
            >
              <Popup>
                <strong>{district.district}</strong>
                <br />
                Areas:
                {district.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
