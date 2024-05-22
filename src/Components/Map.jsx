import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const [latitude, setLatitude] = useState(10.992325);
  const [longitude, setLongitude] = useState(76.970207);

  const BLYNK_AUTH_TOKEN = 'R4ajiWQjT7dmBBoS0-jRWMnjsGK4l_d_';
  const VIRTUAL_PIN1 = 'V0';
  const VIRTUAL_PIN2 = 'V1';

  const getLocation = async () => {
    try {
      const tempLatt = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN1}`);
      setLatitude(parseFloat(tempLatt.data));
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const tempLong = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN2}`);
      setLongitude(parseFloat(tempLong.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getLocation(); // Initial fetch

    const intervalId = setInterval(() => {
      getLocation();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer center={[latitude, longitude]} zoom={17} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
