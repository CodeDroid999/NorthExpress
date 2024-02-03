// AssignmentCard.tsx
import React from 'react';
import Image from 'next/image';

interface AssignmentCardProps {
  id: string;
  title: string;
  date: string;
  status: string;
  price: number;
  offers: number;
  profilePicture: string;
  studentId: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  id,
  title,
  date,
  status,
  price,
  offers,
  profilePicture,
  studentId,
}) => {
  return (
    <div className="assignment-card">
      <h2>{title}</h2>
      <p>Due Date: {date}</p>
      <p>Status: {status}</p>
      <p>Price: ${price}</p>
      <p>Bids: {offers}</p>
      <div style={{ width: '100px', height: '100px' }}>
        <Image
          src={profilePicture}
          alt={`Profile of student ${studentId}`}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default AssignmentCard;
