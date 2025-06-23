import React from "react";

import MapView from "./MapView";


const Coverage = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">
        We are available in 64 districts
      </h2>

      {/* Future: Add your searchable district box here */}

      <MapView />
    </div>
  );
};

export default Coverage;
