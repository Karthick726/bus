import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const SeatMap = ({ layoutId }) => {
  const [seatData, setSeatData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/bus-layout/${layoutId}`);
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchLayout();
  }, [layoutId]);

  const rows = parseInt(seatData?.rows);
  const seats = seatData?.seats || [];

  const getSeatsForRow = (rowNumber) =>
    seats.filter(seat => parseInt(seat.row) === rowNumber);

  const handleSeatChange = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="seat-map-container">
      <h2>Bus Seat Map</h2>
      {seatData && (
        <div className="bus-container">
          {[...Array(rows)].map((_, rowIndex) => {
            const rowNumber = rowIndex + 1;
            const rowSeats = getSeatsForRow(rowNumber);
            const rightSide = rowSeats.slice(0,3);  
            const leftSide = rowSeats.slice(3); 
           

            return (
              <div className="bus-row" key={rowNumber}>
                <div className="bus-side left">
                  {leftSide.map(seat => (
                    <label className={`seat ${seat.status}`} key={seat._id}>
                      <input
                        type="checkbox"
                        disabled={seat.status === 'booked'}
                        checked={selectedSeats.includes(seat._id)}
                        onChange={() => handleSeatChange(seat._id)}
                      />
                      {seat.number}
                    </label>
                  ))}
                </div>
                <div className="aisle" />
                <div className="bus-side right">
                  {rightSide.map(seat => (
                    <label className={`seat ${seat.status}`} key={seat._id}>
                      <input
                        type="checkbox"
                        disabled={seat.status === 'booked'}
                        checked={selectedSeats.includes(seat._id)}
                        onChange={() => handleSeatChange(seat._id)}
                      />
                      {seat.number}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="selected-seats">
        <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
      </div>
    </div>
  );
};

export default SeatMap;
