import { useState, useEffect } from 'react'
import { loadNDVI, loadNO2, loadO3, loadCLM,loadEvents } from './utils/dataLoader'

import Header from './components/Header'
import MapView from './components/MapView'

import 'leaflet/dist/leaflet.css';
import ControlPanel from './components/ControlPanel';


function App() {
  const [measurements, setMeasurements] = useState({
    coords: null,
    NDVI: null,
    NO2: null,
    O3: null,
    weather: null,
    noise: null,
  })

  const [settings, setSettings] = useState({
    city: "BUC",
    layer: "NONE", // or "NO2"
    opacity: 0.8,
    dateRange: null,
  }); // NDVI/NO2 toggle, etc.

  const [data, setData] = useState({
    ndvi: [],
    no2: null,
    o3: null,
    clm: null,
    events: []
  });

  useEffect(() => {
    async function fetchData() {
      const ndvi = await loadNDVI(settings.city);
      const no2 = await loadNO2(settings.city);
      const o3 = await loadO3(settings.city);
      const clm = await loadCLM(settings.city);
      const events = await loadEvents();
      setData({ ndvi, no2, o3, clm, events });
    }

    fetchData();
  }, [settings.city]); // Re-load data when switching cities

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="pt-20 px-4 flex h-[calc(100vh-5rem)]">
        <div className="w-4/5 bg-gray-800 p-4">
          <MapView
            measurements={measurements}
            onMeasurementsChange={setMeasurements}
            settings={settings}
            data={data}
          />
        </div>

        <div className="w-1/4 bg-gray-100 p-4">
          <ControlPanel
            measurements={measurements}
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>

      </main>
    </div>
  )
}

export default App
