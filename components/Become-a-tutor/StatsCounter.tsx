import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsCounter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [startAnimation, setStartAnimation] = useState(false);

  // Update startAnimation state when the element is in view
  if (inView && !startAnimation) {
    setStartAnimation(true);
  }

  return (
    <div ref={ref} className={`flex justify-center items-center space-x-4 p-4 ${startAnimation ? 'animate' : ''}`}>
      <div className="rounded text-center p-2 shadow">
        <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
          <CountUp end={48777} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-xl font-bold pt-2 pb-2 text-green-950">Visitors</p>
      </div>
      <div className="rounded text-center p-2 shadow">
        <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
          <CountUp end={136050} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-xl font-bold pt-2 pb-2 text-green-950">CompletedAssignments</p>
      </div>
      <div className="rounded text-center p-2 shadow">
        <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
          <CountUp end={9.37} duration={2} decimals={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-xl font-bold pt-2 pb-2 text-green-950">Current Quality Score</p>
      </div>
      <div className="rounded text-center p-2 shadow">
        <h2 className="text-3xl font-bold rounded-xl shadow-inner p-1">
          <CountUp end={2674} duration={2} start={startAnimation ? null : undefined} /> +
        </h2>
        <p className="text-xl font-bold pt-2 pb-2 text-green-950">Writers Active</p>
      </div>
    </div>
  );
};

export default StatsCounter;
