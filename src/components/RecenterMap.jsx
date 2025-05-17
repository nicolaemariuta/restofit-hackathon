import { useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ city }) {
  const map = useMap();

  useEffect(() => {
    const coords = city === "CPH" ? [55.6761, 12.5683] : [44.4323, 26.0998];
    map.setView(coords, 12); // optionally, you can change zoom here too
  }, [city, map]);

  return null;
}

export default RecenterMap