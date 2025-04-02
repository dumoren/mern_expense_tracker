import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className={`flex flex-col p-6 rounded-lg ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <h6 className="text-xl font-medium text-gray-800 tracking-wide">{label}</h6>
        <div className="w-10 h-10 flex items-center justify-center text-xl border-2 border-white rounded-lg">
          {icon}
        </div>
      </div>
      <span className="text-xl font-semibold text-black tracking-tight">${value}</span>
    </div>
  );
};

export default InfoCard;
