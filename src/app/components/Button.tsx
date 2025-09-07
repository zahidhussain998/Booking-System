import React from 'react'

function button(
    {
        name,
        onClick,
        disabled = false,
        className = "",
        ...props
    }: {
        name?: string;
        onClick?: () => void;
        disabled?: boolean;
        className?: string;
    
    }
) {
  return (
    <div>
        <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
        {...props}
        >
            {name || "Click Me"}

        </button>
    </div>
  )
}

export default button