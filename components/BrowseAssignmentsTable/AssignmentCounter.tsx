import React from 'react';

const AssignmentCounter = ({ assignments }) => {
  const countLiveProjects = assignments.length;

  return (
    <p className="text-blue-900">Total {countLiveProjects} live projects waiting for you</p>
  );
};

export default AssignmentCounter;
