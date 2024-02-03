import React from 'react'
import Assignment from './assignment'

export default function MyAssignmentsDetails({ heading, assignments, warning }) {
  return (
    <div>
      {assignments.length === 0 ? (
        <div className="mt-36 flex h-full flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-700">{warning}</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-medium text-green-950">{heading}</h1>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assignments.map((assignment: any) => (
              <Assignment key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
