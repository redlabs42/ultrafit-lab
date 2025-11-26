"use client";

import { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatWindow } from "./ChatWindow";

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow isOpen={isOpen} />
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}
