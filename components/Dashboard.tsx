
import React, { useState } from 'react';
import { bookings } from '../data';
import { Booking } from '../types';
import { Card } from './common/Card';
import { Modal } from './common/Modal';

const StatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
  const statusStyles = {
    upcoming: 'bg-blue-500/20 text-blue-300',
    completed: 'bg-green-500/20 text-green-300',
    cancelled: 'bg-red-500/20 text-red-300',
  };
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const BookingCard: React.FC<{ booking: Booking, onReceiptClick: (booking: Booking) => void }> = ({ booking, onReceiptClick }) => (
    <Card className="transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="text-xl font-bold text-white">{booking.serviceName}</h3>
                <p className="text-gray-400">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {booking.time}</p>
                {booking.seats && <p className="text-sm text-gray-500">Seats: {booking.seats.join(', ')}</p>}
            </div>
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <StatusBadge status={booking.status} />
                <p className="font-bold text-lg text-cyan-400">${booking.totalPrice.toFixed(2)}</p>
            </div>
        </div>
        <div className="border-t border-white/10 mt-4 pt-4 flex gap-2">
            <button onClick={() => onReceiptClick(booking)} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">View Receipt</button>
            {booking.status === 'upcoming' && (
                <>
                <button className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">Reschedule</button>
                <button className="text-sm text-red-500/50 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors">Cancel</button>
                </>
            )}
        </div>
    </Card>
);

export const Dashboard: React.FC = () => {
    const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleViewReceipt = (booking: Booking) => {
        setSelectedBooking(booking);
        setReceiptModalOpen(true);
    };

    const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
    const pastBookings = bookings.filter(b => b.status !== 'upcoming');
    
    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen">
            <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">My Dashboard</h1>
                <p className="text-lg text-gray-400">Manage your bookings and view your history.</p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Upcoming Bookings</h2>
                <div className="space-y-4">
                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map(booking => <BookingCard key={booking.id} booking={booking} onReceiptClick={handleViewReceipt} />)
                    ) : (
                        <p className="text-gray-500">No upcoming bookings.</p>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Past Bookings</h2>
                <div className="space-y-4">
                    {pastBookings.map(booking => <BookingCard key={booking.id} booking={booking} onReceiptClick={handleViewReceipt} />)}
                </div>
            </section>
            
            <Modal isOpen={isReceiptModalOpen} onClose={() => setReceiptModalOpen(false)} title="Booking Receipt">
                {selectedBooking && (
                    <div className="space-y-4 text-gray-300">
                       <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-sm text-gray-400">Booking ID</p>
                            <p className="font-mono text-xl text-white">{selectedBooking.id}</p>
                            <p className="text-sm text-gray-400 mt-2">Date</p>
                            <p className="text-white">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                       </div>
                       <div>
                            <p className="font-bold text-lg">{selectedBooking.serviceName}</p>
                            {selectedBooking.seats && <p>Seats: {selectedBooking.seats.join(', ')}</p>}
                            <p>Time: {selectedBooking.time}</p>
                       </div>
                       <div className="border-t border-white/10 pt-3">
                            <div className="flex justify-between items-center text-xl">
                                <span className="font-semibold">Total Paid:</span>
                                <span className="font-bold text-cyan-400">${selectedBooking.totalPrice.toFixed(2)}</span>
                            </div>
                       </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
