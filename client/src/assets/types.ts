import { BookingProps } from '../pages/BookingsPage';

export interface UserContextType {
  user: { name: ''; email: '' };
  ready: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  places: PlacesType[];
  bookings: BookingProps[];
}

export interface PlacesType {
  _id: string;
  title: string;
  address: string;
  photos: [string];
  description: string;
  perks: [string];
  extraInfo: string;
  checkIn: Number;
  checkOut: Number;
  maxGuests: Number;
}

export const baseURL = 'http://localhost:4000';
