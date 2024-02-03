import React from 'react';

const TaskCounter = ({ assignments }) => {
  const countLiveProjects = assignments.length;

  return (
    <p className="text-blue-900">Total {countLiveProjects} live projects waiting for you</p>
  );
};

export default TaskCounter;
