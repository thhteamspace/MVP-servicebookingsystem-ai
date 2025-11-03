
import { Service, Booking, Review } from './types';

export const services: Service[] = [
  {
    id: 1,
    name: 'Cyberpunk: The Musical',
    type: 'theater',
    description: 'A neon-drenched musical adventure in a dystopian future.',
    price: 75,
    location: 'Galaxy Theater',
    category: 'Entertainment',
    image: 'https://picsum.photos/seed/musical/600/400',
    avgRating: 4.8,
    totalRatings: 258
  },
  {
    id: 2,
    name: 'Holistic Spa Session',
    type: 'appointment',
    description: 'Relax and rejuvenate with our signature holistic treatments.',
    duration: 90,
    price: 150,
    location: 'Serenity Spa',
    category: 'Wellness',
    image: 'https://picsum.photos/seed/spa/600/400',
    avgRating: 4.9,
    totalRatings: 172
  },
  {
    id: 3,
    name: 'VR Escape Room: Mars',
    type: 'appointment',
    description: 'Team up to solve puzzles and escape the red planet.',
    duration: 60,
    price: 45,
    location: 'VirtuVerse Arena',
    category: 'Gaming',
    image: 'https://picsum.photos/seed/vr/600/400',
    avgRating: 4.7,
    totalRatings: 312
  },
  {
    id: 4,
    name: 'Interstellar Movie Premiere',
    type: 'theater',
    description: 'Experience the epic journey through space on our IMAX screen.',
    price: 25,
    location: 'Cosmic Cinema',
    category: 'Entertainment',
    image: 'https://picsum.photos/seed/movie/600/400',
    avgRating: 5.0,
    totalRatings: 540
  }
];

export const bookings: Booking[] = [
  {
    id: 'BK-1A2B3C',
    serviceId: 1,
    serviceName: 'Cyberpunk: The Musical',
    userId: 1,
    date: '2024-08-15',
    time: '19:30',
    seats: ['C4', 'C5'],
    status: 'upcoming',
    totalPrice: 150,
  },
  {
    id: 'BK-4D5E6F',
    serviceId: 2,
    serviceName: 'Holistic Spa Session',
    userId: 1,
    date: '2024-07-20',
    time: '14:00',
    status: 'completed',
    totalPrice: 150,
  },
  {
    id: 'BK-7G8H9I',
    serviceId: 3,
    serviceName: 'VR Escape Room: Mars',
    userId: 1,
    date: '2024-07-10',
    time: '16:00',
    status: 'completed',
    totalPrice: 45,
  }
];

export const reviews: Review[] = [
    {
        id: 1,
        serviceId: 2,
        serviceName: 'Holistic Spa Session',
        userName: 'Jane Doe',
        rating: 5,
        comment: 'Absolutely transformative experience. I felt so refreshed afterwards!',
        date: '2024-07-21'
    },
    {
        id: 2,
        serviceId: 3,
        serviceName: 'VR Escape Room: Mars',
        userName: 'John Smith',
        rating: 4,
        comment: 'Great fun with friends, the puzzles were challenging but not impossible.',
        date: '2024-07-11'
    },
    {
        id: 3,
        serviceId: 1,
        serviceName: 'Cyberpunk: The Musical',
        userName: 'Alex Ray',
        rating: 5,
        comment: 'The visuals and music were out of this world. A must-see!',
        date: '2024-06-15'
    }
];

export const analyticsData = {
    totalBookings: 384,
    occupancyRate: 78,
    totalRevenue: 45890,
    monthlyRevenue: [
        { name: 'Jan', revenue: 3200 },
        { name: 'Feb', revenue: 4500 },
        { name: 'Mar', revenue: 4200 },
        { name: 'Apr', revenue: 5100 },
        { name: 'May', revenue: 6200 },
        { name: 'Jun', revenue: 7800 },
        { name: 'Jul', revenue: 7100 },
    ],
    seatOccupancy: [
        { name: 'Cyberpunk', occupancy: 85 },
        { name: 'Interstellar', occupancy: 92 },
    ]
};
