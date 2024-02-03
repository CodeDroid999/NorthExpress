import React, { useState } from 'react'

interface Option {
  value: string
  label: string
}
interface DropdownProps {
  options: { value: string; label: string }[]
  isOpen: boolean
  onToggleOpen: () => void
}

const SortDropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (option: Option) => {
    setSelectedOption((prevSelected) =>
      prevSelected === option ? null : option
    )
  }

  return (
    <div className="relative z-20 mx-2 flex items-center justify-between">
      <button
        className="flex items-center justify-between rounded-3xl bg-white px-2 py-1 text-black transition-colors hover:bg-neutral-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : 'Sort'}</span>
        <svg
          className={`h-6 w-6 ${isOpen ? 'rotate-180 transform' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            fillRule="evenodd"
            d="m7 10 5 5 5-5H7Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 top-full mt-2 rounded-lg border bg-white shadow-lg"
          style={{ minWidth: '300%', maxWidth: '300%', width: 'auto' }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
              onClick={() => handleSelectOption(option)}
            >
              <input
                type="radio"
                className="mr-2 leading-tight"
                checked={selectedOption === option}
                onChange={() => handleSelectOption(option)}
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortDropdown
