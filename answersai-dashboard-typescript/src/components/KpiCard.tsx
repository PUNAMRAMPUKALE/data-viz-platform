import React from "react";
import infoIcon from "../assets/infoIcon.png";

interface KpiCardProps {
  label: string;
  value: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value }) => {
  return (
    <div className="relative bg-card rounded-lg p-4 pr-[30px] text-sm border border-[#3A3A3C] w-full h-[154px] overflow-hidden">

      {/* Icon fixed to top-right */}
      <img
        src={infoIcon}
        alt="info icon"
        className="w-3 h-3 absolute top-4 right-4"
      />

      {/* Title (label) */}
      <div
        className="text-grayText font-medium truncate mb-[10px]"
        style={{
          fontSize: '18px',
          fontFamily: 'Inter',
        }}
      >
        {label}
      </div>

      {/* Description */}
      <div
        className="text-gray-400 break-words"
        style={{
          fontSize: '12px',
          fontFamily: 'Inter',
          lineHeight: '150%',
        }}
      >


        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          This describes variable and what the shown data means.
        </span>

      </div>

      {/* Price / Value */}
      <div
        className="text-white font-bold mt-[20px] truncate text-right"
        style={{
          fontSize: '24px',
          fontFamily: 'Inter',
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default KpiCard;
