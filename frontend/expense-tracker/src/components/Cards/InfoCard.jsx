import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h6 className="text-sm font-medium text-gray-500 tracking-wide">{label}</h6>
        <div className={`w-10 h-10 flex items-center justify-center text-xl text-white ${color} rounded-lg`}>
          {icon}
        </div>
      </div>
      <span className="text-2xl font-semibold text-gray-900 tracking-tight">${value}</span>
    </div>
  );
};

export default InfoCard;
