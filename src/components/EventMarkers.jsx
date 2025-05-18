import { Marker, Popup } from "react-leaflet";
// import events from "../data/events.json"; // Adjust the path as needed
import L from "leaflet";

const EventMarkers = ({events}) => {
    console.log(events)
    return (
        <>
            {events.map((event, index) => (
                <Marker
                    key={index}
                    position={[event.lat, event.lon]}            
                >
                    <Popup>
                        <div className="w-64">
                            <h4 className="text-lg font-bold">{event.title}</h4>
                            <p className="text-sm text-gray-700 mb-1">
                                {event.description}
                            </p>
                            <div>
                            <img
                                src={event.image}
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

