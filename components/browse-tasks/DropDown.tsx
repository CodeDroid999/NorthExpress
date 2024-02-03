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

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (option: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    )
  }

  // Divide the options into two columns
  const splitIndex = Math.ceil(options.length / 2)
  const firstColumnOptions = options.slice(0, splitIndex)
  const secondColumnOptions = options.slice(splitIndex)

  return (
    <div className="relative z-20 mx-2 flex items-center justify-between">
      <button
        className="flex items-center justify-between rounded-3xl bg-white px-2 py-1 text-black transition-colors hover:bg-neutral-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(', ')
            : 'Dropdown'}
        </span>
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
        <div className="absolute right-0 top-full mt-2 grid grid-cols-2 rounded-lg border bg-white shadow-lg">
          <div>
            {firstColumnOptions.map((option) => (
              <label
                key={option.value}
                className="block px-2 py-1 text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelectOption(option)}
                />
                {option.label}
              </label>
            ))}
          </div>
          <div>
            {secondColumnOptions.map((option) => (
              <label
                key={option.value}
                className="block px-2 py-2 text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelectOption(option)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
