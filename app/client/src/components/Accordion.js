import React, { useState } from "react";
const Accordion = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <div
        onClick={() => setOpen((open) => !open)}
        className="cursor-pointer flex justify-between items-center py-3 border-b border-neutrals-400"
      >
        <h3 className="text-neutrals-100 text-lg capitalize font-header text-neutrals-100 ">
          {title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-neutrals-100 transform transition-transform ease-in-out ${
            open && "rotate-180"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {open && <div className="py-3">{children}</div>}
    </div>
  );
};

export default Accordion;
