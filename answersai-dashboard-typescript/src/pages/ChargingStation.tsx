import React, { useState } from "react";


// Import UI components
import KpiCard from "../components/KpiCard";
import SlideOverPanel from "../components/SlideOverPanel";


// Import charting library components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Import assets/icons
import refreshFrame from "../assets/Vector.png";
import homeFrame from "../assets/homeframe.png";
import uploadIcon from "../assets/uploadIcon.png";
import arrowUp from "../assets/upIcon.png";
import arrowDown from "../assets/downIcon.png";
import infoIcon from "../assets/infoIcon.png";
import arrowIcon from "../assets/direction.png";
import plusIcon from "../assets/plus.png";


// Sample chart data
const data = [
  { name: "Apr", value: 20000 },
  { name: "May", value: 50000 },
  { name: "Jun", value: 45000 },
  { name: "Jul", value: 90000 },
  { name: "Aug", value: 60000 },
  { name: "Sep", value: 30000 },
  { name: "Oct", value: 50000 },
];


// Collapsible result box component
export const ExpandableResultBox: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  try {
    return (
      <div className="bg-[#1C1C1C]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/starIcon.png"
              alt="Star"
              className="w-[18px] h-[18px]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <h2 className="text-limeSoft font-semibold text-[24px] leading-[36px]">
              Best Scenario Results
            </h2>
          </div>


          {/* Toggle expand/collapse */}
          <button
            className="border-lime-400 rounded-full flex items-center justify-center"
            onClick={() => setExpanded(!expanded)}
          >
            <img
              src={expanded ? arrowUp : arrowDown}
              alt={expanded ? "Collapse" : "Expand"}
              className="w-[34px] h-[44px]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </button>
        </div>


        {/* Display result messages if expanded */}
        {expanded && (
          <div className="space-y-2 mt-6">
            <div className="flex justify-between items-center border border-lime-400 text-[#C9FF3B] rounded px-6 py-4 text-sm">
              <span>
                The best configuration based on profit is 11 zones with 48 poles.
              </span>
              <span className="text-xl">...</span>
            </div>
            <div className="flex justify-between items-center border border-lime-400 text-lime-400 rounded px-6 py-4 text-sm">
              <span>
                The best configuration based on demand is 11 zones with 48 poles.
              </span>
              <span className="text-xl">...</span>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <div className="text-red-400">Failed to load results section.</div>;
  }
};


// Main charging station page component
const ChargingStation: React.FC = () => {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div className="flex flex-col bg-[#1B1B1D] min-h-screen">
      {/* Header Bar */}
      <div className="flex justify-between items-center px-6 pt-4">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/lightning_bolt.png"
            alt="Lightning Bolt"
            style={{ width: 15, height: 27.5 }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-white text-2xl font-bold">Charging Station</h1>
        </div>

        {/* Right: Buttons */}

        <div className="flex items-center gap-2">

          {/* Refresh icon */}
          <div className="relative w-[32px] h-[32px]">
            <img src={homeFrame} alt="refresh frame" className="absolute w-full h-full" />
            <img src={refreshFrame} alt="icon" className="absolute top-1/2 left-1/2 w-[20px] h-[20px] transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Slide-over toggle button */}
          <button
            onClick={() => setOpenPanel(true)}
            className="bg-transparent text-white border border-gray-600 rounded-md px-4 py-2"
          >
            Edit Variables
          </button>

          <div className="relative w-[32px] h-[32px]">
            <img src={homeFrame} alt="upload frame" className="absolute w-full h-full" />
            <img src={uploadIcon} alt="upload icon" className="absolute top-1/2 left-1/2 w-[20px] h-[20px] transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Slide-over panel for variable editing */}
      <SlideOverPanel visible={openPanel} onClose={() => setOpenPanel(false)} />

      <div className="px-6 pt-10">

        {/* Expandable best result summary */}
        <ExpandableResultBox />

        {/* Graph and KPI section */}
        <div className="mt-[50px] flex gap-6 items-start justify-between">
          {/* Chart Area */}

          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-base font-semibold mb-4">Graph</span>
            </div>
            <div className="bg-[#1B1B1D] border border-[#3A3A3C] p-4 rounded">
              {/* Graph heading and dropdown */}
              <div className="flex justify-between items-center mb-2 text-sm text-white">
                <span className="font-medium"></span>
                <select className="bg-[#2B2B2D] text-white px-2 py-1 rounded text-sm">
                  <option>Unsatisfied Demand %</option>
                </select>
              </div>


              {/* Line Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis
                      stroke="#ccc"
                      tick={{ fill: "#ccc", fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      domain={[0, 100000]}
                      ticks={[20000, 40000, 60000, 80000, 100000]}
                    />
                    {/* Custom Tooltip */}
                    <Tooltip
                      content={({ active, payload }) => {
                        try {
                          if (active && payload && payload.length) {
                            const value = payload[0].value;
                            return (
                              <div className="bg-[#1e1e1f] text-white text-sm rounded-md p-3 shadow-md border border-zinc-700 min-w-[120px] relative">
                                <div className="flex justify-between items-center">
                                  <div className="text-base font-semibold">
                                    ${(value as number / 1000).toFixed(2)}k
                                  </div>
                                  <img
                                    src={infoIcon}
                                    alt="info"
                                    className="w-[14px] h-[14px] object-contain"
                                  />
                                </div>
                                <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                  <img
                                    src={arrowIcon}
                                    alt="up"
                                    className="w-[10px] h-[10px] object-contain"
                                  />
                                  4.6% above target
                                </div>
                              </div>
                            );
                          }
                          return null;
                        } catch {
                          return <div className="text-red-400">Tooltip error</div>;
                        }
                      }}
                    />
                    {/* Highlight vertical line */}
                    <ReferenceLine x="Jul" stroke="#b4ff3c" strokeDasharray="3 3" />
                    <Line type="linear" dataKey="value" stroke="#b4ff3c" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* KPI Cards Section */}
          <div className="w-[400px] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-white text-base font-semibold">Key Performance Indicators</span>
              <button className="flex items-center gap-1 text-white text-sm bg-[#2B2B2D] border border-[#3A3A3C] px-3 py-1 rounded hover:border-lime-400">

                Variables
                <img src={plusIcon} alt="+" className="w-[12px] h-[12px]" />
              </button>
            </div>

            {/* Grid of KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              <KpiCard label="Infrastructure Units" value="€421.07" />
              <KpiCard label="Charging Growth" value="33.07" />
              <KpiCard label="Localization change" value="21.9%" />
              <KpiCard label="Fleet growth" value="7.03%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingStation;
