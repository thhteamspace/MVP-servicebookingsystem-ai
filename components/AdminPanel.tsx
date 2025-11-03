
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyticsData, bookings, services } from '../data';
import { Card } from './common/Card';
import { Booking, Service } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <Card>
        <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
        <p className="text-3xl font-bold text-white my-1">{value}</p>
        <p className="text-gray-500 text-xs">{description}</p>
    </Card>
);

export const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const PIE_COLORS = ['#00FFFF', '#FFDAB9', '#FFFFFF', '#8884d8'];

    const renderDashboard = () => (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Revenue" value={`$${analyticsData.totalRevenue.toLocaleString()}`} description="All time revenue" />
                <StatCard title="Total Bookings" value={analyticsData.totalBookings.toLocaleString()} description="All time bookings" />
                <StatCard title="Occupancy Rate" value={`${analyticsData.occupancyRate}%`} description="Average across all services" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#00FFFF" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4">Seat Occupancy</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={analyticsData.seatOccupancy} dataKey="occupancy" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {analyticsData.seatOccupancy.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );

    const renderTable = <T,>(data: T[], columns: { key: keyof T; header: string }[]) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-white/20">
                        {columns.map(col => <th key={String(col.key)} className="p-3">{col.header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                            {columns.map(col => <td key={String(col.key)} className="p-3">{(item[col.key] as any)?.toString()}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen">
            <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Admin Panel</h1>
                <p className="text-lg text-gray-400">Oversee and manage your operations.</p>
            </header>

            <div className="flex justify-center border-b border-white/10 mb-6">
                <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 font-medium transition ${activeTab === 'dashboard' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Dashboard</button>
                <button onClick={() => setActiveTab('services')} className={`px-6 py-3 font-medium transition ${activeTab === 'services' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Services</button>
                <button onClick={() => setActiveTab('bookings')} className={`px-6 py-3 font-medium transition ${activeTab === 'bookings' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Bookings</button>
            </div>

            <div>
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'services' && <Card>{renderTable<Service>(services, [{key: 'id', header: 'ID'}, {key: 'name', header: 'Name'}, {key: 'category', header: 'Category'}, {key: 'price', header: 'Price'}])}</Card>}
                {activeTab === 'bookings' && <Card>{renderTable<Booking>(bookings, [{key: 'id', header: 'ID'}, {key: 'serviceName', header: 'Service'}, {key: 'date', header: 'Date'}, {key: 'status', header: 'Status'}, {key: 'totalPrice', header: 'Total'}])}</Card>}
            </div>
        </div>
    );
};
