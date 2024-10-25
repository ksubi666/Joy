import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from 'next/image';
import { SetStateAction, Dispatch } from 'react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PositionItem {
  location: [number, number];
  image: string[];
  name: string;
}

interface MapProps {
  center?: [number, number];
  location: [number, number];
  position: PositionItem[] | null;
  setLocation: Dispatch<SetStateAction<[number, number]>>;
}

const Map: React.FC<MapProps> = ({
  center = [47.920068, 106.917332],
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
    <MapContainer center={center} zoom={15} className="h-full w-full">
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=6x4bjJJpQrYpFrpEGg0H"
      />
      {location && <Marker position={location} />}
      {position &&
        position.map((el, index) => (
          <Marker key={index} position={el.location}>
            <Popup>
              <div className="w-[200px] flex flex-col gap-2">
                <Image
                  src={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${el.image[0]}`}
                  alt="location"
                  width={200}
                  height={100}
                />
                <h3 className="font-semibold">{el.name}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      <MapEvents />
    </MapContainer>
  );
};

export default Map;
