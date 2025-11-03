
import React, { useState } from 'react';
import { services } from '../data';
import { Service } from '../types';
import { Card } from './common/Card';
import { StarRating } from './common/StarRating';

interface HomeProps {
  onBookNow: (service: Service) => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const Home: React.FC<HomeProps> = ({ onBookNow }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    
    const categories = ['All', ...new Set(services.map(s => s.category))];

    const filteredServices = services.filter(service => {
        return (
            (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterCategory === 'All' || service.category === filterCategory)
        );
    });

    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen">
            <header className="text-center space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Discover Services</h1>
                <p className="text-lg text-gray-400">Book your next experience with us.</p>
            </header>

            <div className="max-w-3xl mx-auto space-y-4">
                 <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search for services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-2">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setFilterCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filterCategory === category ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map(service => (
                    <Card key={service.id} className="flex flex-col overflow-hidden transform hover:-translate-y-2 duration-300">
                        <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-t-xl" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                             <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
                                <StarRating rating={service.avgRating} readOnly />
                                <span>({service.totalRatings})</span>
                            </div>
                            <p className="text-gray-300 mb-4 flex-grow">{service.description}</p>
                            <div className="text-sm text-gray-400 space-y-1 mb-6">
                                <p><strong>Location:</strong> {service.location}</p>
                                {service.duration && <p><strong>Duration:</strong> {service.duration} mins</p>}
                                <p><strong>Price:</strong> ${service.price}</p>
                            </div>
                            <button 
                                onClick={() => onBookNow(service)}
                                className="mt-auto w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                            >
                                Book Now
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
