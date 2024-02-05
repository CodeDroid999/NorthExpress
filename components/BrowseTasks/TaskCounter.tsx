import React from 'react';

const TaskCounter = ({ bookings }) => {
  const countLiveProjects = bookings.length;

  return (
    <p className="text-blue-900">Total {countLiveProjects} live projects waiting for you</p>
  );
};

export default TaskCounter;
