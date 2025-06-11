import React from 'react';
import Lottie from 'lottie-react';
import settingsAnimation from '../assets/animations/settings.json';

const SettingsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded-full  hover:bg-gray-200 transition-all"
      aria-label="Open settings"
    >
      <div className="w-10 h-10 flex-shrink-0">
        <Lottie animationData={settingsAnimation} loop={true} />
      </div>
    </button>
  );
};

export default SettingsButton;
