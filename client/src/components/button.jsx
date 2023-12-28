import React from 'react'

export function Button({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-blue-600 text-white rounded w-1/5 ml-2 hover:bg-blue-700 focus:outline-none"
        >
            Fetch
        </button>
    )
}