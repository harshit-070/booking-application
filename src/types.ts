export interface Booking {
  id: string;
  timestamp: number;
  name: string;
}

export interface WaitingEntry extends Booking {}

export interface BookingState {
  availableSlots: number;
  bookings: Booking[];
  waitingList: WaitingEntry[];
}
