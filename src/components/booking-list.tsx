import { Button } from "./ui/button";
import type { Booking } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X } from "lucide-react";

interface BookingListProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
  title: string;
}

export function BookingList({ bookings, onCancel, title }: BookingListProps) {
  if (bookings.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
          >
            <div>
              <p className="font-medium">{booking.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(booking.timestamp).toLocaleString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCancel(booking.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel booking</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
