import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

// Component to handle map clicks and update position
const LocationSelector = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]); // Update position on map click
        },
    });
    return null;
};

// Component to handle map clicks and update position
const LocationModal = ({ onClose }) => {
    const [position, setPosition] = useState(null); // User's current position
    const [error, setError] = useState(null); // Error message for location issues
    const [searchTerm, setSearchTerm] = useState(''); // Search input value
    const [searchError, setSearchError] = useState(null); // Error message for search issues
    const [searchResults, setSearchResults] = useState([]); // List of search results


    // Auto-detect user's location
    useEffect(() => {
        const detectLocation = async () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]); // Set detected position
                },
                async (err) => {
                    console.error('Geolocation error:', err);
                    setError('Unable to detect your location automatically. Using fallback location.');

                    // Fallback to IP-based location detection
                    try {
                        const res = await fetch('https://ipinfo.io/json?token=d5ae59b4474fd0'); // Replace with your IPInfo API key
                        if (!res.ok) throw new Error('Network response was not ok');

                        const data = await res.json();
                        const [lat, lon] = data.loc.split(','); // IPInfo returns "loc" as "latitude,longitude"
                        if (lat && lon) {
                            setPosition([parseFloat(lat), parseFloat(lon)]);
                        } else {
                            throw new Error('Fallback location data incomplete');
                        }
                        
                       
                    } catch (fallbackErr) {
                        console.error('Fallback location error:', fallbackErr);
                        setError('Unable to fetch your location. Please try again.');
                    }
                }
            );
        };

        detectLocation();
    }, []);

    // Handle location search
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchError('Please enter a location to search.');
            return;
        }
        setSearchResults([]); // Clear previous search results
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
            );
            const data = await res.json();

            if (data.length > 0) {
                setSearchResults(data); // Update search results
                setSearchError(null); // Clear any previous search errors
            } else {
                setSearchResults([]);
                setSearchError('Location not found. Please try again.');
            }
        } catch (err) {
            console.error('Search error:', err);
            setSearchError('An error occurred while searching for the location.');
        }
    };

    // Handle selecting a location from search results
    const handleSelectLocation = (lat, lon) => {
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setSearchResults([]); // Clear search results after selection
    };

    // Handle current location button click
    const handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]); // Set position to current location
                setError(null); // Clear any previous errors
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError('Unable to fetch your current location. Please try again.');
            }
        );
    };

    return (
        <div className="fixed w-[500px] mx-auto inset-0  bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
                <h2 className="text-xl font-bold text-gray-800 text-center">📍 Confirm Your Location</h2>

                {/* Search Bar */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search for a location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 transition-colors"
                    >
                        Search
                    </button>
                </div>
                {searchError && <p className="text-red-500 text-sm">{searchError}</p>}

                {/* Current Location Button */}
                <button
                    onClick={handleCurrentLocation}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-medium mb-4"
                >
                    Use Current Location
                </button>

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectLocation(result.lat, result.lon)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {result.display_name}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Map Container */}
                <div className="h-96 rounded overflow-hidden border border-gray-200 shadow-sm">
                    {error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : position ? (
                        <MapContainer center={position} zoom={16} className="h-full w-full">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>Your selected location</Popup>
                            </Marker>
                            <LocationSelector setPosition={setPosition} />
                        </MapContainer>
                    ) : (
                        <p className="text-center text-gray-500">Detecting your location...</p>
                    )}
                </div>

                {/* Confirm Button */}
                <button
                    onClick={() => {
                        console.log('Selected Position:', position); // Log the selected position
                        onClose();
                    }}
                    className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition font-medium"
                >
                    Confirm Location
                </button>
            </div>
        </div>
    );
}

export default LocationModal;