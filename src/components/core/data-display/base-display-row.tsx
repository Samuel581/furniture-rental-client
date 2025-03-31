import React from 'react'

function DisplayRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
        {children}
    </div>
  )
}

export default DisplayRow
