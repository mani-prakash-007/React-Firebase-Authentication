import React from "react";

export const Input = ({ label, id, name, type, placeholder, onChange }) => {
  return (
    <>
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300  text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder={placeholder}
            required
          />
        </div>
      </div>
    </>
  );
};
