// import events from "../data/events.json"; // Adjust the path as needed
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import defaultIconUrl from '../assets/default-event-marker.png'
import appropriateIconUrl from '../assets/appropriate-event-marker.png'
import { getDistanceFromLatLonInKm } from '../utils/apropiateEvents.js'

function getEventIcon(event, markerPosition) {
    let iconUrl = defaultIconUrl

    if (markerPosition) {
        const isNearby = getDistanceFromLatLonInKm(
          markerPosition[0],
          markerPosition[1],
          event.lat,
          event.lon
        ) <= 2;

        if (isNearby) {
            iconUrl = appropriateIconUrl
        }
    }

    return new L.Icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [13, 41],
    });
}


const EventMarkers = ({events, markerPosition}) => {
    return (
        <>
            {events.map((event, index) => (
                <Marker
                    key={index}
                    position={[event.lat, event.lon]}
                    icon={getEventIcon(event, markerPosition)}
                >
                    <Popup>
                        <div className="w-64">
                            <h4 className="text-lg font-bold">{event.title}</h4>
                            <p className="text-sm text-gray-700 mb-1">
                                {event.description}
                            </p>
                            <div>
                            <img
                                src={event.image || '/bg-default-image.png'}
                                alt={event.title}
                                className="w-full h-full object-cover rounded"
                            />
                            </div>
                            <div className="text-xs text-gray-500">
                                {event.tags.join(", ")}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default EventMarkers

