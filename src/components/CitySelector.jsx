import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'London', 'Tokyo',
  'Sydney', 'Cairo', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Indianapolis'
];

const CitySelector = ({ onCitySelect, selectedCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 pr-12 border  
                     rounded-xl shadow-sm   
                     text-blue-500 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder={selectedCity || 'Select a city'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {/* Clear button */}
        {searchTerm && (
          <button
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 z-10"
            onClick={handleClear}
          >
            <FaTimes />
          </button>
        )}
        {/* Chevron icon */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <FaChevronDown />
        </span>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div
          className="absolute w-full mt-2 border rounded-xl shadow-xl max-h-64 overflow-y-auto z-20 animate-fade-in
                     bg-white border-gray-200 text-gray-800
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <div
                key={index}
                className="px-4 py-3 cursor-pointer transition-colors
                           hover:bg-blue-100 dark:hover:bg-gray-700"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
              No cities found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySelector;
