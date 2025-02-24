import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { BookingForm } from "./components/booking-form.tsx";
import { BookingList } from "./components/booking-list.tsx";
import { useBookingStore } from "./hooks/use-booking-store.ts";
import { ThemeToggle } from "./components/theme-toggle.tsx";
import { Calendar, Users } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider.tsx";

export default function App() {
  const { state, book, cancel, joinWaitingList, reset, cancelWaiting } =
    useBookingStore();
  const { availableSlots, bookings, waitingList } = state;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              <h1 className="text-xl font-bold">Event Booking System</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="container max-w-2xl mx-auto p-4 space-y-8 py-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Booking System
              </h2>
              <p className="text-muted-foreground">
                A seamless booking system
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Alert className="bg-primary/10 border-primary/20">
                <Users className="h-4 w-4" />
                <AlertTitle>Available Slots</AlertTitle>
                <AlertDescription className="font-semibold text-lg">
                  {availableSlots} {availableSlots === 1 ? "spot" : "spots"}{" "}
                  remaining
                </AlertDescription>
              </Alert>

              <Alert className="bg-muted">
                <Calendar className="h-4 w-4" />
                <AlertTitle>Event Date</AlertTitle>
                <AlertDescription>Feb 25, 2025</AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-4">
              {availableSlots > 0 ? "Reserve Your Spot" : "Join Waiting List"}
            </h3>
            {availableSlots > 0 ? (
              <BookingForm onSubmit={book} />
            ) : (
              <BookingForm onSubmit={joinWaitingList} isWaitingList />
            )}
          </div>

          <div className="grid gap-6">
            <BookingList
              bookings={bookings}
              onCancel={cancel}
              title="Current Bookings"
            />

            {waitingList.length > 0 && (
              <BookingList
                bookings={waitingList}
                onCancel={cancelWaiting}
                title="Waiting List"
              />
            )}
          </div>

          <div className="pt-8 flex justify-end">
            <Button variant="destructive" onClick={reset}>
              Reset Booking System
            </Button>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
