// import events from "../data/events.json"; // Adjust the path as needed
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import defaultIconUrl from '../assets/default-event-marker.png'
import appropriateIconUrl from '../assets/appropriate-event-marker.png'
import { getDistanceFromLatLonInKm } from '../utils/apropiateEvents.js'
import StarRating from './StarRating'

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
                        <div className="w-64 flex flex-col gap-y-2">
                            <div>
                                <img
                                  src={event.image || '/bg-default-image.png'}
                                  alt={event.title}
                                  className="w-full object-cover rounded h-32"
                                />
                            </div>
                            <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                                {event.tags.map((tag, index) => (
                                  <div key={index} className="capitalize bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-green-600 hover:text-white">
                                      {tag.trim()}
                                  </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <StarRating rating={event.provider?.rating}/>
                                <span className="text-green-200 hover:text-green-600 cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                       className="">
                                        <path
                                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                </span>
                            </div>
                            <h4 className="text-lg font-semibold">{event.title}</h4>
                            <div className="text-xs text-gray-700 font-semibold p-0 -mb-2">Details:</div>
                            <div className="text-xs text-gray-700">
                                {event.description}
                            </div>
                            <div className="mt-2">
                                <button className="cursor-pointer bg-green-400 hover:bg-green-600 text-white py-2 text-center w-full rounded-lg">
                                    Register to event
                                </button>
                                <button className="mt-2 cursor-pointer bg-yellow-300 hover:bg-yellow-500 text-white py-2 text-center w-full rounded-lg">
                                    Similar events
                                </button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default EventMarkers

