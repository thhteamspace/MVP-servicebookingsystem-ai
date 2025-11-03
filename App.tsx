
import React, { useState, useCallback } from 'react';
import { Home } from './components/Home';
import { Booking } from './components/Booking';
import { Dashboard } from './components/Dashboard';
import { Reviews } from './components/Reviews';
import { AdminPanel } from './components/AdminPanel';
import { Page, Service } from './types';

// Icon components
const HomeIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all ${active ? 'text-cyan-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const TicketIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all ${active ? 'text-cyan-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM4 8h5v2H4V8z" clipRule="evenodd" /></svg>;
const UserIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all ${active ? 'text-cyan-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const StarIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all ${active ? 'text-cyan-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const AdminIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all ${active ? 'text-cyan-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;


const dockItems = [
    { id: 'Home' as Page, label: 'Home', icon: HomeIcon },
    { id: 'Booking' as Page, label: 'Bookings', icon: TicketIcon },
    { id: 'Dashboard' as Page, label: 'Dashboard', icon: UserIcon },
    { id: 'Reviews' as Page, label: 'Reviews', icon: StarIcon },
    { id: 'Admin' as Page, label: 'Admin', icon: AdminIcon },
];

const Dock: React.FC<{ activePage: Page, setActivePage: (page: Page) => void }> = ({ activePage, setActivePage }) => {
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            <div className="flex items-center justify-center space-x-2 bg-black/30 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/50 px-4 py-3">
                {dockItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className="relative p-3 rounded-full transition-all duration-300 group hover:bg-white/10"
                        aria-label={item.label}
                    >
                        <item.icon active={activePage === item.id} />
                        {activePage === item.id && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0D0D0D]"></span>
                        )}
                        <span className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

const PageContainer: React.FC<{ isVisible: boolean, children: React.ReactNode }> = ({ isVisible, children }) => (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {children}
    </div>
);


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleBookNow = useCallback((service: Service) => {
    setSelectedService(service);
    setActivePage('Booking');
  }, []);
  
  const handleBookingComplete = useCallback(() => {
    setActivePage('Dashboard');
  }, []);

  return (
    <div className="relative min-h-screen w-full pb-24">
      <main>
        {/* We keep all pages in the DOM to preserve state, but only show the active one. */}
        <div style={{ display: activePage === 'Home' ? 'block' : 'none' }}><Home onBookNow={handleBookNow} /></div>
        <div style={{ display: activePage === 'Booking' ? 'block' : 'none' }}><Booking service={selectedService} onBookingComplete={handleBookingComplete} /></div>
        <div style={{ display: activePage === 'Dashboard' ? 'block' : 'none' }}><Dashboard /></div>
        <div style={{ display: activePage === 'Reviews' ? 'block' : 'none' }}><Reviews /></div>
        <div style={{ display: activePage === 'Admin' ? 'block' : 'none' }}><AdminPanel /></div>
      </main>
      <Dock activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;
