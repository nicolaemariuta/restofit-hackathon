import { useEffect } from 'react';
import logo from '../assets/Garden-for-Good.png';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'

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

function getWeatherColor(value) {
    if (value == "Overcast") return "#ff0000";
    if (value == "Cloudy") return "#ff8800";
    if (value == "Partly Cloudy") return "#ffff00";
    if (value == "Mostly Clear") return "#00ff00";
    return "#00ff00";
}



export default function ControlPanel({ measurements, settings, onSettingsChange }) {

    const handleLayerChange = (value) => {
        onSettingsChange({ ...settings, layer: value });
    };

    const handleCityChange = (value) => {
        onSettingsChange({ ...settings, city: value });
    };


    return (
        <div className="w-full h-full bg-[#d6eadf] rounded-lg overflow-hidden shadow-md">

            <div className="p-4 w-full bg-[#81bd27] text-white px-6 py-4 flex items-center gap-4 shadow-md z-50">
                <img src={logo} alt="RestoFit Logo" className="h-5 w-5" />
                <h1 className="text-1xl font-bold">Control Panel</h1>
            </div>

            <div className="p-4 mb-4">
                <label className="block mb-1 font-semibold text-black">Select Layer:</label>
                <Select onValueChange={handleLayerChange}>
                    <SelectTrigger className="w-full text-black font-medium border-gray-400">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="NDVI">NDVI</SelectItem>
                        <SelectItem value="NO2">NO₂</SelectItem>
                        <SelectItem value="O3">O3</SelectItem>
                        <SelectItem value="WEATHER">weather</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            {/* <div className="p-4 mb-4">
                <label className="block mb-1 text-black">Select City:</label>
                <select value={settings.city} onChange={handleCityChange} className="w-full text-black">
                    <option value="BUC">Bucharest</option>
                    <option value="CPH">Copenhagen</option>
                </select>
            </div> */}

            <div className="p-4 mb-4">
                <label className="block mb-1 font-semibold text-black">Select City:</label>
                <Select onValueChange={handleCityChange}>
                    <SelectTrigger className="w-full text-black font-medium border-gray-400">
                        <SelectValue placeholder="Bucharest" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BUC">Bucharest</SelectItem>
                        <SelectItem value="CPH">Copenhagen</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="p-4 mb-4">
                <p className="block mb-1 font-semibold text-black">Selected Coordinates:</p>
                <p className="text-xs font-medium text-red-900">
                    {measurements.coords ? `${measurements.coords.lat.toFixed(4)}, ${measurements.coords.lon.toFixed(4)}` : "None selected"}
                </p>
            </div>


            <div className="p-4 mt-6">
                <p className="block mb-1 font-semibold text-black">NDVI:</p>

                {measurements.NDVI != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className={`text-xs font-medium text-red-900`}>
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

            <div className="p-4 mt-6">
                <p className="text-sm mb-1 font-semibold text-black">NO₂:</p>

                {measurements.NO2 != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs font-medium text-red-900">
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


            <div className="p-4 mt-6">
                <p className="text-sm mb-1 font-semibold text-black">O3:</p>

                {measurements.O3 != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs font-medium text-red-900">
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


            {/* <div className="p-4 mt-6">
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
            </div> */}

            <div className="p-4 mt-6">
                <p className="text-sm mb-1 font-semibold text-black">Weather:</p>

                {measurements.weather != null ? (
                    <div className="flex items-center justify-between h-6">
                        <p className="text-xs font-medium text-red-900">
                            {measurements.weather}
                        </p>
                        <div
                            className="w-6 h-6  ml-2 rounded-sm"
                            style={{
                                backgroundColor: getWeatherColor(measurements.weather),
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">None selected</p>
                )}
            </div>


        </div>
    );
}
