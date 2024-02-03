import React from 'react'
import HighestEarnerCard from './HighestEarnerCard'

export default function HighestEarners() {
    return (
        <div className="bg-gray-100 pb-5 pt-3">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  text-2xl font-bold text-green-900 pt-2 pb-4">
                        Highest Earners
                    </h1>
                    <HighestEarnerCard />
                </div>
            </div>
        </div>
    )
}
