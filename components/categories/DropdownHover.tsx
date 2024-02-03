import React, { useState } from 'react'

interface DropdownProps {
  trigger: React.ReactNode
  content: React.ReactNode
}

const HoverDropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}
      {isOpen && (
        <div className="absolute right-0 top-10 rounded border bg-white p-4 shadow-lg">
          {content}
        </div>
      )}
    </div>
  )
}

export default HoverDropdown
