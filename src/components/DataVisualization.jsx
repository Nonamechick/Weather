import React, { useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const DataVisualization = ({ hourlyData }) => {
  const { t } = useContext(LanguageContext);
  const pathRef = useRef(null);

  if (!hourlyData || hourlyData.length === 0) {
    return <div className="text-center text-lg text-blue-700">{t.noData}</div>;
  }

  const width = 700;
  const height = 300;
  const padding = 40;

  const temps = hourlyData.map(item => item.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const xScale = (width - 2 * padding) / (hourlyData.length - 1);
  const yScale = (height - 2 * padding) / tempRange;

  const points = hourlyData.map((item, index) => {
    const x = padding + index * xScale;
    const y = height - padding - ((item.temp - minTemp) * yScale);
    return [x, y];
  });

  const pointString = points.map(p => p.join(',')).join(' ');

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength;
      pathRef.current.style.strokeDashoffset = pathLength;
      pathRef.current.getBoundingClientRect(); // Force reflow
      pathRef.current.style.transition = 'stroke-dashoffset 1.5s ease-out';
      pathRef.current.style.strokeDashoffset = 0;
    }
  }, [hourlyData]);

  return (
    <div className="rounded-xl p-6 shadow-md overflow-x-auto bg-blue-50">
      <svg width={width} height={height} className="block">
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding + (i * (height - 2 * padding) / 4);
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#93c5fd" // light blue for grid
              strokeWidth="1"
            />
          );
        })}

        {/* Temperature line with animation */}
        <polyline
          ref={pathRef}
          points={pointString}
          fill="none"
          stroke="#1d4ed8" // Tailwind's blue-700 hex
          strokeWidth="3"
        />

        {/* Data points and labels */}
        {points.map(([x, y], index) => {
          const item = hourlyData[index];
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="5" fill="#1d4ed8" />
              <>
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#1e3a8a" // dark blue text
                >
                  {item.time}
                </text>
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#1e3a8a"
                >
                  {item.temp}°
                </text>
              </>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {[maxTemp, minTemp].map((temp, i) => {
          const y = padding + i * (height - 2 * padding);
          return (
            <text
              key={temp}
              x={padding - 10}
              y={y + 5}
              textAnchor="end"
              fontSize="14"
              fill="#1e3a8a"
            >
              {Math.round(temp)}°
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default DataVisualization;
