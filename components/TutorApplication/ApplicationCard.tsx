import React from 'react';

interface ApplicationCardProps {
    id: string;
    status: string;
    date: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ id, status, date }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>Application ID: {id}</h3>
            <p>Status: {status}</p>
            <p>Date: {date}</p>
        </div>
    );
};

export default ApplicationCard;
