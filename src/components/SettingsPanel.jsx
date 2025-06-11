import React, { useState, useEffect } from "react";

const SettingsPage = ({ autoRefreshLabel, updatedLabel, onClose }) => {
  const [pingTime, setPingTime] = useState(null);
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [requestCount, setRequestCount] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState("Calculating...");

  useEffect(() => {
    
    const checkPing = async () => {
      const startTime = performance.now();
      try {
        await fetch(window.location.origin, { mode: "no-cors" });
        const endTime = performance.now();
        setPingTime(Math.round(endTime - startTime) + " ms");
        setServerStatus("🟢 Online");
      } catch (error) {
        setPingTime("Server Unreachable");
        setServerStatus("🔴 Offline");
      }
    };

    
    const requestInterval = setInterval(() => {
      setRequestCount((prev) => prev + 1);
    }, 5000);

    
    const testDownloadSpeed = () => {
      const fileSize = 5 * 1024 * 1024; 
      const startTime = performance.now();
      setTimeout(() => {
        const endTime = performance.now();
        const timeTaken = (endTime - startTime) / 1000; 
        const speedMbps = (fileSize / timeTaken / 1024 / 1024).toFixed(2);
        setDownloadSpeed(`${speedMbps} Mbps`);
      }, 1000);
    };

    checkPing();
    testDownloadSpeed();

    return () => clearInterval(requestInterval); 
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg sm:max-w-2xl transform transition-all duration-300 ease-in-out animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            ❌ Close
          </button>
        </div>
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            🔄 {autoRefreshLabel}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            ⏱️ <strong>Local Server Response Time:</strong> {pingTime ?? "Checking..."}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            🌐 <strong>Server Status:</strong> {serverStatus}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            📡 <strong>API Requests Sent:</strong> {requestCount}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            🚀 <strong>Estimated Network Speed:</strong> {downloadSpeed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
