// src/components/widgets/library/weather/WeatherWidget.tsx
import React from 'react';

export default function WeatherWidget() {
  return (
    <div className="flex flex-col h-full">
      {/* Widget’s own header */}
      <header className="flex items-center px-4 py-2 border-b dark:border-gray-700">
        <img src="/widgets/library/weather/icon.svg" alt="Weather" className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Weather
        </h3>
      </header>

      {/* Widget’s own content */}
      <div className="flex-1 p-4 flex flex-col justify-center items-center">
        <div className="text-5xl font-bold">72°F</div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sunny in San Diego
        </div>
      </div>
    </div>
  );
}
