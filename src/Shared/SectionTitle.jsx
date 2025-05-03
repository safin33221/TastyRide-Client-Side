import React from "react";

const SectionTitle = ({ title, desc }) => {
  return (
    <div className="px-3">
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-3">
        {title}
      </h1>
      <p className="text-center text-gray-600 font-medium mb-12">
        {desc}
      </p>
    </div>
  );
};

export default SectionTitle;
