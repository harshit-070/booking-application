"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BookingFormProps {
  onSubmit: (name: string) => void;
  isWaitingList?: boolean;
}

export function BookingForm({ onSubmit, isWaitingList }: BookingFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        className="flex-1"
      />
      <Button type="submit">
        {isWaitingList ? "Join Waiting List" : "Book Now"}
      </Button>
    </form>
  );
}
