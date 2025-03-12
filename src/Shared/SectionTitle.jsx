import React from "react";

const SectionTitle = ({ title, desc }) => {
  return (
    <div>
      <h1 className="text-center text-4xl font-semibold mb-3">
        {title}
      </h1>
      <p className="text-center text-xl font-medium mb-12">
        {desc}
      </p>
    </div>
  );
};

export default SectionTitle;
