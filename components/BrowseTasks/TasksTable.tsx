import React, { useState } from 'react';
import TaskCounter from './TaskCounter';

const assignmentsData = [
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  { id: 1, summary: "450 min for the assignment. There is part two for the two responses.", price: "$45.00", dueDate: "15/11/2023", bids: 41 },
  // ... other assignment objects
];

const TasksTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = assignmentsData.filter(row =>
    row.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='border border-blue-800 rounded-xl  pb-3'>
      <p className="bg-green-900 w-full p-3 text-white">Make Money by Helping with Homework</p>
      <div className="flex flex-col flex-grow w-full bg-white p-2">
        <table className="w-full">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Price</th>
              <th>Due Date</th>
              <th>Bids</th>
            </tr>
          </thead>
          <tbody className="pt-2 pb-2">
            {currentRows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                <td className="pl-2 pt-1 pb-1">{row.summary}</td>
                <td className="text-center">{row.price}</td>
                <td className="text-center">{row.dueDate}</td>
                <td className="text-center">{row.bids}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full flex-col justify-center">
          <div className="assignment-counter text-blue-900">
            <TaskCounter assignments={filteredData} />
          </div>
          <div className="pagination space-x-2 flex justify-center">
            {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, index) => (
              <button className="bg-yellow-500 px-2" key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksTable;
