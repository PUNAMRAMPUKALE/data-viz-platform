import React, { useState } from "react";
import searchIcon from "../assets/search.png";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Charging Stations");
  const tabs = ["Charging Stations", "Fleet Sizing", "Parking"];

  return (
    <div
      className="flex justify-between items-center rounded-md shadow w-full box-border"
      style={{
        height: "87px",
        marginTop: "5px",
        padding: "20px 24px",
      }}
    >
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 max-w-[65%]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-white text-sm whitespace-nowrap ${isActive
                  ? "bg-[#2E2E2E] border border-gray-600"
                  : "bg-transparent border border-transparent hover:border-gray-500"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search input */}
      <div className="relative w-[240px] flex-shrink-0">
        {/* Icon inside input */}
        <div
          className="absolute top-1/2 left-[12px] transform -translate-y-1/2 flex items-center justify-center"
          style={{ width: "28px", height: "28px" }}
        >
          <img
            src={searchIcon}
            alt="search"
            style={{
              width: "14px",
              height: "14px",
              objectFit: "contain",
              filter:
                "brightness(0) saturate(100%) invert(88%) sepia(0%) saturate(0%) hue-rotate(174deg) brightness(95%) contrast(91%)",
            }}
          />
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search"
          className="pl-[48px] pr-[78px] py-[8px] w-full rounded border border-gray-600 bg-[#2E2E2E] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px", // 150%
            letterSpacing: "-0.32px", // -2.3%
          }}
        />
      </div>
    </div>
  );
};

export default Header;
