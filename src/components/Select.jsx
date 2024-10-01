import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className='inline-block mb-2 pl-1 text-gray-300'>
          {label}
        </label>
      )}
      <select
        {...props} 
        id={id} 
        ref={ref} 
        className={` block
            w-full
            mt-2
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-500 ${className}`}
      >
        <option value="">Select an organization</option> {/* Default option */}
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
