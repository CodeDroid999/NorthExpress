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

const FiltersDropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (option: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    )
  }

  return (
    <div className="relative z-20 mx-2 flex items-center justify-between">
      <button
        className="flex items-center justify-between whitespace-nowrap rounded-3xl bg-white px-2 py-1 text-black transition-colors hover:bg-neutral-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Other Filters</span>
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
        <div className="w-40% absolute right-0 top-full mt-2 rounded-lg border bg-white shadow-lg">
          <div className="w-full whitespace-nowrap border-2">
            <div className="flex flex-col px-4 py-2">
              <div className="mb-4 text-left  text-neutral-500">Assignmentprice</div>
              <label className="block cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  checked={selectedOptions.includes(options[0])}
                  onChange={() => handleSelectOption(options[0])}
                />
                Available assignments only
                <div className="mb-4 text-left  text-neutral-500">
                  Hide assignments that are already assigned
                </div>
              </label>

              <label className="block cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  checked={selectedOptions.includes(options[2])}
                  onChange={() => handleSelectOption(options[2])}
                />
                Assignments with no offers only
                <div className="mb-4 text-left  text-neutral-500">
                  Hide assignments that have offers
                </div>
              </label>
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
      )}
    </div>
  )
}

export default FiltersDropdown
