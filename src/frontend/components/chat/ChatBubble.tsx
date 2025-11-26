"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  readonly isOpen: boolean;
  readonly onClick: () => void;
}

export function ChatBubble({ isOpen, onClick }: ChatBubbleProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg transition-all duration-300 z-50",
        isOpen
          ? "bg-red-600 hover:bg-red-700"
          : "bg-primary hover:bg-primary/90"
      )}
      size="icon"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <MessageCircle className="h-6 w-6 text-white" />
      )}
    </Button>
  );
}
