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

const PriceDropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (option: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    )
  }

  // Set price slider
  const [price, setPrice] = useState(5)

  const handleSliderChange = (event) => {
    setPrice(event.target.value)
  }

  return (
    <div className="relative z-20 mx-2 flex items-center justify-between">
      <button
        className="flex items-center justify-between whitespace-nowrap rounded-3xl bg-white px-2 py-1 text-black transition-colors hover:bg-neutral-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(', ')
            : 'Any price'}
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
        <div className="mt- w-40% absolute right-0 top-full rounded-lg border bg-white shadow-lg">
          <div className="w-full">
            <div className="flex items-center justify-center">
              <div className="rounded-lg bg-white p-4 shadow-lg">
                <div className="mb-4 text-left  text-neutral-500">
                  Assignmentprice
                </div>
                <span className="ml-4">${price} - $9999</span>
                <div className="flex overflow-x-auto">
                  <div className="flex items-center overflow-x-auto p-2">
                    <input
                      type="range"
                      min="5"
                      max="9999"
                      step="1"
                      value={price}
                      onChange={handleSliderChange}
                      className="w-64"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="rounded-3xl bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-300 focus:outline-none">
                    Cancel
                  </button>
                  <button className="rounded-3xl bg-green-900 px-4 py-2 text-white hover:bg-blue-400 focus:outline-none">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceDropdown
