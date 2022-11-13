import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
export const MapView = () => {
  // const incidents =[ {"location":  {"latitude":"37.2725", "longitude":"-80.4327"}
  // , "type":"other", "timestamp": "2022‑07‑30"}, {"location":  {"latitude":"37.227746", "longitude":"-80.421960"}
  // , "type":"other", "timestamp": "2022‑07‑31"}, {"location":  {"latitude":"37.23", "longitude":"-80"}
  // , "type":"other", "timestamp": "2022‑07‑32"}]

  const [incidents, setIncidents] = useState([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getIncidents = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => console.log(err)
    );

    let response = await fetch("http://localhost:4000/incidents/", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json, text/plain, */*",
      },
    });

    response = await response.json();

    setIncidents(response);

    console.log(response);
  };

  useEffect(() => {
    setIncidents(getIncidents());
  }, []);

  return (
    <div>
      {latitude && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {incidents.length > 0 &&
            incidents.map((incident) => (
              <Marker
                position={[
                  incident.location.latitude,
                  incident.location.longitude,
                ]}
              >
                <Popup>
                  Incident Type: {incident.type} <br /> Date:{" "}
                  {incident.timestamp.substring(0, 10)}
                </Popup>
                <Tooltip>
                  Incident Type: {incident.type} <br />
                  Date: {incident.timestamp.substring(0, 10)}
                </Tooltip>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
};
