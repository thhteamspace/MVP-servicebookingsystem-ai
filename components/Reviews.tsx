
import React, { useState } from 'react';
import { reviews, services } from '../data';
import { Card } from './common/Card';
import { StarRating } from './common/StarRating';
import { Review } from '../types';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <Card>
        <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center font-bold text-cyan-300 text-xl">
                {review.userName.charAt(0)}
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <div>
                         <h4 className="font-bold text-white">{review.userName}</h4>
                         <p className="text-sm text-gray-400">on {review.serviceName}</p>
                    </div>
                    <StarRating rating={review.rating} readOnly />
                </div>
                <p className="mt-2 text-gray-300">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-3">{new Date(review.date).toLocaleDateString()}</p>
            </div>
        </div>
    </Card>
);

export const Reviews: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState<number>(services[0].id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ serviceId: selectedServiceId, rating, comment });
        // Here you would typically send the review to a server
        alert('Thank you for your review!');
        setRating(0);
        setComment('');
    };

    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen">
            <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Reviews & Ratings</h1>
                <p className="text-lg text-gray-400">See what others are saying and share your experience.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-2xl font-bold">Leave a Review</h3>
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Service</label>
                                <select 
                                    id="service" 
                                    value={selectedServiceId}
                                    onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                >
                                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Your Rating</label>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Comment</label>
                                <textarea 
                                    id="comment" 
                                    rows={4} 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="Tell us about your experience..."
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                            >
                                Submit Review
                            </button>
                        </form>
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                </div>
            </div>
        </div>
    );
};
