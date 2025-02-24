"use client";

import { useCallback, useEffect, useState } from "react";
import type { Booking, BookingState, WaitingEntry } from "../types";

const STORAGE_KEY = "event-booking-state";
const INITIAL_SLOTS = Number(import.meta.env.VITE_TOTAL_SLOTS) || 2;

const getInitialState = (): BookingState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    availableSlots: INITIAL_SLOTS,
    bookings: [],
    waitingList: [],
  };
};

export function useBookingStore() {
  const [state, setState] = useState<BookingState>(getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const book = useCallback((name: string) => {
    setState((current) => {
      if (current.availableSlots > 0) {
        const newBooking: Booking = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          name,
        };
        return {
          ...current,
          availableSlots: current.availableSlots - 1,
          bookings: [...current.bookings, newBooking],
        };
      }
      return current;
    });
  }, []);

  const joinWaitingList = useCallback((name: string) => {
    setState((current) => {
      const newEntry: WaitingEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        name,
      };
      return {
        ...current,
        waitingList: [...current.waitingList, newEntry],
      };
    });
  }, []);

  const cancel = useCallback((id: string) => {
    setState((current) => {
      console.log(current);
      const booking = current.bookings.find((b) => b.id === id);
      if (!booking) return current;

      const newState = {
        ...current,
        availableSlots: current.availableSlots + 1,
        bookings: current.bookings.filter((b) => b.id !== id),
      };

      if (current.waitingList.length > 0) {
        const [nextInLine, ...remainingWaitList] = current.waitingList;
        return {
          ...newState,
          availableSlots: newState.availableSlots - 1,
          bookings: [
            ...newState.bookings,
            { ...nextInLine, timestamp: Date.now() },
          ],
          waitingList: remainingWaitList,
        };
      }

      return newState;
    });
  }, []);

  const cancelWaiting = useCallback((id: string) => {
    setState((current) => {
      const waiting = current.waitingList.find((b) => b.id === id);
      if (!waiting) return current;

      return {
        ...current,
        waitingList: current.waitingList.filter((b) => b.id != id),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      availableSlots: INITIAL_SLOTS,
      bookings: [],
      waitingList: [],
    });
  }, []);

  return {
    state,
    book,
    cancel,
    joinWaitingList,
    reset,
    cancelWaiting,
  };
}
