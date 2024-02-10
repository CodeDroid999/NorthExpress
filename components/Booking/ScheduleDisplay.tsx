import { db } from '../../firebase';
import React, { useState, useEffect } from 'react';

const TripsDisplay = ({ travelDate }) => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const tripsSnapshot = await db.collection('schedule').doc(travelDate).collection('trips').get();
                const tripsData = tripsSnapshot.docs.map(doc => doc.data());
                setTrips(tripsData);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [travelDate]);

    return (
        <div>
            <h2>Trips for Schedule ID: {travelDate}</h2>
            <ul>
                {trips.map((trip, index) => (
                    <li key={index}>
                        <h3>Trip ID: {trip.id}</h3>
                        <p>Departure: {trip.departure}</p>
                        <p>Driver: {trip.driverId}</p>
                        <p>Pickup: {trip.pickup}</p>
                        <p>Dropoff: {trip.dropoff}</p>
                        <p>Available Seats: {trip.availableSeats}</p>
                        <p>Capacity: {trip.capacity}</p>
                        <p>Fare: {trip.fare}</p>
                        <p>Vehicle ID: {trip.vehicleId}</p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TripsDisplay;
