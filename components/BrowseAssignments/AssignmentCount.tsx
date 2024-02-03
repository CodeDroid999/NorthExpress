import React from 'react';

const AssignmentCount = ({ assignments }) => {
  const countLiveProjects = assignments.length;

  return (
    <p className="text-blue-900 text-center bg-green-200 p-1 mt-2"> You have posted a  of {countLiveProjects} Assignments!</p>
  );
};

export default AssignmentCount;
