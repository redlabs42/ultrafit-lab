"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  readonly isOpen: boolean;
}

export function ChatWindow({ isOpen }: ChatWindowProps) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <Card className="fixed bottom-20 right-4 w-[350px] h-[500px] shadow-xl z-50 flex flex-col border-border/50 backdrop-blur-sm bg-background/95">
      <CardHeader className="p-4 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo-small.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span>Assistente Ultrafit</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <p>Olá! Como posso ajudar você hoje?</p>
                <p className="text-xs mt-2">
                  Pergunte sobre nossos produtos ou serviços.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback
                    className={
                      message.role === "user"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    }
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`rounded-lg p-3 text-sm max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <span key={index}>{part.text}</span>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {status === "streaming" && (
              <div className="flex gap-2">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={status !== "ready"}
          />
          <Button
            type="submit"
            size="icon"
            disabled={status !== "ready" || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
