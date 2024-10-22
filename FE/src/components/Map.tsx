import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: [number, number];
  location: [number, number];
  position: [number, number];
}
const Map: React.FC<MapProps> = ({
  center = [47.890664, 106.909683],
  position,
  setLocation,
  location,
}) => {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };

  return (
    <MapContainer center={center} zoom={16} className="h-full w-full">
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=6x4bjJJpQrYpFrpEGg0H"
      />
      {location && <Marker position={location} />}
      {position && <Marker position={position} />}
      <MapEvents />
    </MapContainer>
  );
};

export default Map;
