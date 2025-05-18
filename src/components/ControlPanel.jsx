import { useEffect } from 'react';
import logo from '../assets/RestorArk.png';

function getNDVIColorClass(value) {
    if (value > 0.7) return "text-green-400";
    if (value > 0.4) return "text-yellow-400";
    if (value > 0.2) return "text-orange-400";
    return "text-red-400";
}

function getNDVIColor(value) {
    if (value > 0.7) return "#00ff00"; // bright green
    if (value > 0.4) return "#88cc44"; // lime/olive
    if (value > 0.2) return "#ffaa00"; // orange
    return "#ff0000"; // red
}

function getNO2Color(value) {
    if (value > 0.9) return "#ff0000";
    if (value > 0.5) return "#ff8800";
    if (value > 0.3) return "#ffff00";
    return "#00ff00";
}



export default function ControlPanel({ measurements, settings, onSettingsChange }) {

    const handleLayerChange = (e) => {
        onSettingsChange({ ...settings, layer: e.target.value });
    };

    const handleCityChange = (e) => {
        onSettingsChange({ ...settings, city: e.target.value });
    };


    return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-md">

            <div className="w-full bg-blue-600 text-white px-6 py-4 flex items-center gap-4 shadow-md z-50">
                <img src={logo} alt="RestoFit Logo" className="h-5 w-5" />
                <h1 className="text-1xl font-bold">Control Panel</h1>
            </div>


            <div className="mb-4">
                <label className="block mb-1 text-black">Select Layer:</label>
                <select value={settings.layer} onChange={handleLayerChange} className="w-full text-black">
                    <option value="NONE">none</option>
                    <option value="NDVI">NDVI</option>
                    <option value="NO2">NO₂</option>
                    <option value="O3">O3</option>
                    <option value="WEATHER">weather</option>
                </select>
            </div>


            <div className="mb-4">
                <label className="block mb-1 text-black">Select City:</label>
                <select value={settings.city} onChange={handleCityChange} className="w-full text-black">
                    <option value="BUC">Bucharest</option>
                    <option value="CPH">Copenhagen</option>
                </select>
            </div>

            <div>
                <p className="text-sm text-black">Selected Coordinates:</p>
                <p className="text-xs text-red-900">
                    {measurements.coords ? `${measurements.coords.lat}, ${measurements.coords.lon}` : "None selected"}
                </p>
            </div>


            <div className="mt-6">
                <p className="text-sm mb-1 text-black">NDVI:</p>

                {measurements.NDVI != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className={`text-xs ${getNDVIColorClass(measurements.NDVI)}`}>
                            {measurements.NDVI.toFixed(3)}
                        </p>

                        <div
                            className="w-6 h-6 ml-2 rounded-sm"
                            style={{
                                backgroundColor: getNDVIColor(measurements.NDVI),
                            }} />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>

            <div className="mt-6">
                <p className="text-sm mb-1 text-black">NO₂:</p>

                {measurements.NO2 != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs text-blue-300">
                            {measurements.NO2.toFixed(3)}
                        </p>
                        <div
                            className="w-6 h-6  ml-2 rounded-sm"
                            style={{
                                backgroundColor: getNO2Color(measurements.NO2),
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>


            <div className="mt-6">
                <p className="text-sm mb-1 text-black">O3:</p>

                {measurements.NO2 != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs text-blue-300">
                            {measurements.O3.toFixed(3)}
                        </p>
                        <div
                            className="w-6 h-6  ml-2 rounded-sm"
                            style={{
                                backgroundColor: getNO2Color(measurements.NO2),
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>


            <div className="mt-6">
                <p className="text-sm mb-1 text-black">Noise:</p>

                {measurements.noise != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs text-blue-300">
                            {measurements.noise.toFixed(3)}
                        </p>
                        <div
                            className="w-6 h-6  ml-2 rounded-sm"
                        // style={{
                        //     backgroundColor: getNO2Color(measurements.NO2),
                        // }}
                        />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>

             <div className="mt-6">
                <p className="text-sm mb-1 text-black">Weather:</p>

                {measurements.weather != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs text-blue-300">
                            {measurements.weather}
                        </p>
                        <div
                            className="w-6 h-6  ml-2 rounded-sm"
                        // style={{
                        //     backgroundColor: getNO2Color(measurements.NO2),
                        // }}
                        />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>


        </div>
    );
}
