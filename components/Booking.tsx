
import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { Card } from './common/Card';
import { Modal } from './common/Modal';

interface BookingProps {
  service: Service | null;
  onBookingComplete: () => void;
}

const Seat: React.FC<{ status: 'available' | 'booked' | 'selected'; label: string; onClick: () => void; }> = ({ status, label, onClick }) => {
    const baseClasses = "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 transform";
    const statusClasses = {
        available: 'bg-green-500/20 text-green-300 hover:bg-green-500/40 hover:scale-110 cursor-pointer',
        booked: 'bg-red-500/30 text-red-400 cursor-not-allowed',
        selected: 'bg-cyan-500 text-black scale-110 ring-2 ring-offset-2 ring-offset-[#0D0D0D] ring-cyan-400 cursor-pointer'
    };
    return <button onClick={onClick} disabled={status === 'booked'} className={`${baseClasses} ${statusClasses[status]}`}>{label}</button>
}

const TimeSlot: React.FC<{ time: string; selected: boolean; onClick: () => void; }> = ({ time, selected, onClick }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer";
    const selectedClasses = selected ? 'bg-cyan-500 text-black' : 'bg-white/10 hover:bg-white/20';
    return <button onClick={onClick} className={`${baseClasses} ${selectedClasses}`}>{time}</button>
}

export const Booking: React.FC<BookingProps> = ({ service, onBookingComplete }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const bookedSeats = useMemo(() => ['A3', 'B5', 'C2', 'F8', 'F9'], []);
  const timeSlots = useMemo(() => ['10:00', '11:00', '14:00', '15:00', '16:30', '17:30'], []);

  if (!service) return <div className="p-8 text-center text-gray-400">Please select a service first.</div>;

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };
  
  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const totalPrice = service.type === 'theater' ? selectedSeats.length * service.price : (selectedTime ? service.price : 0);
  
  const handleConfirmBooking = () => {
    const newBookingId = `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setBookingId(newBookingId);
    setConfirmModalOpen(true);
  };
  
  const handleModalClose = () => {
    setConfirmModalOpen(false);
    onBookingComplete();
  }
  
  const renderTheaterBooking = () => (
    <>
      <div className="space-y-4">
        <div className="bg-black/50 p-4 rounded-lg text-center text-white font-bold text-lg tracking-widest">SCREEN</div>
        <div className="grid grid-cols-10 gap-2 sm:gap-3">
          {Array.from({ length: 60 }).map((_, i) => {
            const row = String.fromCharCode(65 + Math.floor(i / 10));
            const col = (i % 10) + 1;
            const seatId = `${row}${col}`;
            const status = bookedSeats.includes(seatId) ? 'booked' : selectedSeats.includes(seatId) ? 'selected' : 'available';
            return <Seat key={seatId} label={seatId} status={status} onClick={() => handleSeatClick(seatId)} />;
          })}
        </div>
      </div>
      <div className="flex items-center justify-around mt-6 p-2 bg-black/20 rounded-lg">
          <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-green-500/50"></div><span className="text-sm">Available</span></div>
          <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-cyan-500"></div><span className="text-sm">Selected</span></div>
          <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded bg-red-500/50"></div><span className="text-sm">Booked</span></div>
      </div>
    </>
  );

  const renderAppointmentBooking = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Select a Time Slot</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {timeSlots.map(time => <TimeSlot key={time} time={time} selected={selectedTime === time} onClick={() => handleTimeClick(time)} />)}
      </div>
    </div>
  );
  
  return (
    <div className="p-4 sm:p-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">{service.name}</h1>
          <p className="text-lg text-gray-400">Complete your booking</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                {service.type === 'theater' ? renderTheaterBooking() : renderAppointmentBooking()}
            </Card>
            <Card className="lg:col-span-1 flex flex-col justify-between">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Booking Summary</h3>
                    <div className="border-t border-white/10 pt-4 space-y-2">
                        <p><strong>Service:</strong> {service.name}</p>
                        {service.type === 'theater' && <p><strong>Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>}
                        {service.type === 'appointment' && <p><strong>Time:</strong> {selectedTime || 'None'}</p>}
                        <p><strong>Price per item:</strong> ${service.price}</p>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-4 mt-6">
                    <div className="flex justify-between items-baseline mb-4">
                        <span className="text-lg text-gray-300">Total Price:</span>
                        <span className="text-3xl font-bold text-cyan-400">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleConfirmBooking}
                      disabled={totalPrice === 0}
                      className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100"
                    >
                        Confirm Booking
                    </button>
                </div>
            </Card>
        </div>
      </div>
       <Modal isOpen={isConfirmModalOpen} onClose={handleModalClose} title="Booking Successful!">
          <div className="text-center space-y-4 text-gray-200">
            <p className="text-lg">Your booking for <strong>{service.name}</strong> has been confirmed.</p>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400">Booking ID</p>
                <p className="text-2xl font-mono text-cyan-400 tracking-widest">{bookingId}</p>
            </div>
            <p>A confirmation has been sent to your email.</p>
            <button onClick={handleModalClose} className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors">
                Done
            </button>
          </div>
      </Modal>
    </div>
  );
};
