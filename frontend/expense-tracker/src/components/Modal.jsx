import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="flex items-start justify-center w-full h-full p-4">
        <div 
          className="bg-white/95 w-full max-w-2xl rounded-xl shadow-lg border border-gray-100 relative z-50 mt-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-100 bg-white/95 rounded-t-xl">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body - with scrolling */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
