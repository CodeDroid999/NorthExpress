import React, { useState } from 'react'

const UserAbout = ({ about }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="">
      <h1 className="mb-1 text-xl font-semibold text-green-950">About</h1>

      {showDetails ? (
        <div>
          <p className="pt-1 pb-2 text-md whitespace-wrap">{about}</p>
          <button
            className="mt-1 text-xs text-blue-800 underline"
            onClick={toggleDetails}
          >
            Show Less
          </button>
        </div>
      ) : (
        <div>
          <p className="pt-1 pb-2 text-lg">{about?.slice(0, 500)}...</p>
          <button
            className="mt-1 text-xs text-blue-800 underline"
            onClick={toggleDetails}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAbout
