import React from "react";

const LocationSearchPanel = ({
  suggestions = [],
  activeField,
  setPickup,
  setDestination
}) => {
  // Predefined locations as search suggestions
  const defaultSuggestions = [
    { id: 1, title: "Sheryians Coding School", subtitle: "24B, Near Kapoor's Cafe, Bhopal" },
    { id: 2, title: "Sheryians Coding School", subtitle: "18A, Opposite to Sharma's Tapri, Bhopal" },
    { id: 3, title: "Sheryians Coding School", subtitle: "22C, Behind Verma's Sweets, Bhopal" },
    { id: 4, title: "Sheryians Coding School", subtitle: "10D, Near Malhotra's Gym, Bhopal" }
  ];

  const items = suggestions.length > 0 ? suggestions : defaultSuggestions;

  const handleSelect = (subtitle) => {
    if (activeField === "pickup") {
      setPickup(subtitle);
    } else if (activeField === "destination") {
      setDestination(subtitle);
    }
  };

  return (
    <div className="space-y-3 mt-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelect(item.subtitle)}
          className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-black active:bg-gray-100 transition duration-150 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
            <p className="text-xs text-gray-500 font-medium">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
