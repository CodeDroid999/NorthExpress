import React, { useState } from 'react'
import CategoryDropdown from './CategoryDropDown'
import SortDropdown from './SortDropDown'
import PriceDropdown from './PriceDropDown'
import FiltersDropdown from './FiltersDropDown'
import PriceDropDown from './PriceDropDown'

const SearchComponent: React.FC = () => {
  const Sortoptions = [
    // Your sort options here
  ]

  const Categoryoptions = [
    // Your category options here
  ]

  // State and functions for controlling dropdown open/close
  const [openCategory, setOpenCategory] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openPrice, setOpenPrice] = useState(false)
  const [openFilters, setOpenFilters] = useState(false)
  const [openSort, setOpenSort] = useState(false)

  const toggleCategory = () => {
    setOpenCategory(!openCategory)
    setOpenLocation(false)
    setOpenPrice(false)
    setOpenFilters(false)
    setOpenSort(false)
  }

  const toggleLocation = () => {
    setOpenCategory(false)
    setOpenLocation(!openLocation)
    setOpenPrice(false)
    setOpenFilters(false)
    setOpenSort(false)
  }

  const togglePrice = () => {
    setOpenCategory(false)
    setOpenLocation(false)
    setOpenPrice(!openPrice)
    setOpenFilters(false)
    setOpenSort(false)
  }

  const toggleFilters = () => {
    setOpenCategory(false)
    setOpenLocation(false)
    setOpenPrice(false)
    setOpenFilters(!openFilters)
    setOpenSort(false)
  }

  const toggleSort = () => {
    setOpenCategory(false)
    setOpenLocation(false)
    setOpenPrice(false)
    setOpenFilters(false)
    setOpenSort(!openSort)
  }

  return (
    <div className="top-135 fixed left-0 z-10 w-full  border border-x-transparent border-b-gray-500 border-t-gray-500  bg-white duration-300 ease-in">
      <div className="m-auto flex max-w-[1100px] items-center justify-between p-3">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <div
            className="relative  flex w-[35vw] items-center justify-between 
        "
          >
            {/* Use the hidden class to hide the input on small screens */}
            <input
              type="text"
              placeholder="Search for an assignment"
              className="text-dark w-full flex-shrink-0 flex-grow rounded-3xl bg-neutral-200 px-2 py-1 pr-10 focus:outline-none"
            />
            <CategoryDropdown
              options={Categoryoptions}
              isOpen={openCategory}
              onToggleOpen={toggleCategory}
            />
            <PriceDropDown
              options={Sortoptions}
              isOpen={openPrice}
              onToggleOpen={togglePrice}
            />
            <FiltersDropdown
              options={Sortoptions}
              isOpen={openFilters}
              onToggleOpen={toggleFilters}
            />
            <SortDropdown
              options={Sortoptions}
              isOpen={openSort}
              onToggleOpen={toggleSort}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
