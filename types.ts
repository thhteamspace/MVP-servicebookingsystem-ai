
export type ServiceType = 'theater' | 'appointment';

export interface Service {
  id: number;
  name: string;
  type: ServiceType;
  description: string;
  duration?: number; // in minutes
  price: number;
  location: string;
  category: string;
  image: string;
  avgRating: number;
  totalRatings: number;
}

export interface Booking {
  id: string;
  serviceId: number;
  serviceName: string;
  userId: number;
  date: string;
  time: string;
  seats?: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPrice: number;
}

export interface Review {
  id: number;
  serviceId: number;
  serviceName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type Page = 'Home' | 'Booking' | 'Dashboard' | 'Reviews' | 'Admin';
