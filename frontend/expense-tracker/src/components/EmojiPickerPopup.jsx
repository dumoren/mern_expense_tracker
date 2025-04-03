import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Calculate if we should show above or below
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const pickerHeight = 400; // Approximate height of emoji picker
      
      let top = rect.bottom + window.scrollY;
      if (spaceBelow < pickerHeight && spaceAbove > spaceBelow) {
        top = rect.top - pickerHeight + window.scrollY;
      }
      
      // Calculate horizontal position
      let left = rect.left;
      const pickerWidth = 350; // Approximate width of emoji picker
      if (left + pickerWidth > viewportWidth) {
        left = viewportWidth - pickerWidth - 20;
      }
      
      setPosition({ top, left });
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        ref={buttonRef}
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="">{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div 
          className="fixed z-50"
          style={{ 
            top: position.top,
            left: position.left
          }}
        >
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || "");
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
