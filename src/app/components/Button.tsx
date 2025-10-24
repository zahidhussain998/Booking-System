import React, { PropsWithChildren } from 'react'


type buttonInfo = {
     name?: string;
        onClick?: () => void;
        disabled?: boolean;
        className?: string;
        props:void;
}

function button(Button:buttonInfo) {
  return (
    <div>
        <button
        onClick={Button.onClick}
        disabled={Button.disabled}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${Button.className}`}
        {...Button.props}
        >
            {Button.name || "Click Me"}

        </button>
    </div>
  )
}

export default button