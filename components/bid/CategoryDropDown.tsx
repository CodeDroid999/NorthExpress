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

const CategoryDropdown: React.FC<DropdownProps> = ({ options }) => {
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
        className="flex items-center justify-between whitespace-nowrap rounded-3xl bg-white px-2 py-1 text-black transition-colors hover:bg-neutral-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(', ')
            : 'Category'}
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
        <div className="w-40% absolute right-0 top-full mt-2 rounded-lg border bg-white px-3 py-3 shadow-lg">
          <div className="w-full">
            <div className="relative w-full rounded-lg border bg-white">
              <div className="flex items-center justify-between px-2 py-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded border px-2 py-1 focus:outline-none"
                />
                <button className="ml-2 rounded bg-green-900 px-4 py-1 text-white hover:bg-blue-600 focus:outline-none">
                  Search
                </button>
              </div>
              <div className="grid grid-cols-4 whitespace-nowrap">
                {/* Render your options here */}
              </div>
            </div>

            <div className="whitespace-nowrap">
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
            <div className="whitespace-nowrap">
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
        </div>
      )}
    </div>
  )
}

export default CategoryDropdown
