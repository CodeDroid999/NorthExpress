import React from 'react';
import { MdStar, MdStarHalf } from 'react-icons/md';

const Rating = (rating) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = Array.from({ length: filledStars }, (_, i) => (
    <MdStar key={i} className="text-yellow-500 text-2xl p-1 text-center" />
  ));

  if (hasHalfStar) {
    stars.push(<MdStarHalf key="half" className="text-yellow-500 text-2xl p-1 text-center" />);
  }

  return stars;
};

const HighestEarner = () => {
  // Sample data
  const earners = [
    { name: 'Allan Mitchell', rating: 5, earnings: 94372 },
    { name: 'Parma Jackson', rating: 4.5, earnings: 82447 },
    { name: 'Caroline Smith', rating: 4, earnings: 80329 },
    { name: 'Priya Prithanka', rating: 4.5, earnings: 78669 },
  ];

  return (
    <div className="row w-full bg-gray-100 sm:shadow">
      {earners.map((earner, index) => (
        <div key={index} className="col-md-3 col-sm-6 border align-items-center justify-items-center pb-2 pt-2">
          <h2 className="text-center text-xl font-semibold text-blue-950">{earner.name}</h2>
          {/* Display star rating */}
          <div className="flex flex-row items-center justify-center space-x-1">
            {Rating(earner.rating)}
          </div>
          {/* Display earnings */}
          <p className="text-lg text-green-900 text-center">$ {earner.earnings.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default HighestEarner;
