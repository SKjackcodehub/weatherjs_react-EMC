import React, { useState } from 'react';
import axios from 'axios';

// Import images from the src folder
import skyImage from '../assets/clear-sky.jpg';


// Map weather conditions to imported images
const weatherImages = {
    wallpaper:skyImage 
};

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [weatherImage, setWeatherImage] = useState('');

    const getWeather = async () => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=45c0a0bbe07a295eb6f41f4bbcb669e1`;
        try {
            if (!city.trim()) {
                setError('Please enter a city name.');
                return;
            }
            const response = await axios.get(url);
            setWeatherData(response.data);

            // Map weather condition to image
            const weatherCondition = response.data.weather[0].main.toLowerCase();
            setWeatherImage(weatherImages[weatherCondition] || '');

            setError(''); // Clear any previous error messages
        } catch (error) {
            setWeatherData(null); // Clear any previous weather data
            setWeatherImage(''); // Clear the image in case of an error
            setError('Error fetching the weather data. Please check the city name and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-800 to-green-500">
            <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Weather Report</h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    I can give you a weather report about your city!
                </p>
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-300 mb-4"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-500 mb-4">{error}</p>
                    )}
                    <button
                        onClick={getWeather}
                        className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-700 transition duration-300 shadow-md"
                    >
                        Get Report
                    </button>
                </div>

                {weatherData && (
                    <div className="mt-8 text-center text-gray-800">
                        {weatherImage && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={weatherImage}
                                    alt={weatherData.weather[0].main}
                                    className="w-30 h-30 object-contain rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                            <p className="text-xl"><strong>Weather:</strong> {weatherData.weather[0].main}</p>
                            <p className="text-xl"><strong>Temperature:</strong> {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
                            <p className="text-xl"><strong>Description:</strong> {weatherData.weather[0].description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;