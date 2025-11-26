"use client";

import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AIPromptFormProps {
  onSubmit: (prompt: string, options: Record<string, string | number>) => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  fields?: Array<{
    name: string;
    label: string;
    type: "text" | "number" | "select";
    options?: string[];
    placeholder?: string;
  }>;
}

export function AIPromptForm({
  onSubmit,
  isLoading,
  title = "Descreva o que você precisa",
  description = "Seja específico para melhores resultados",
  placeholder = "Ex: Quero um plano para ganhar massa muscular...",
  fields = [],
}: AIPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<Record<string, string | number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, options);
    }
  };

  const handleOptionChange = (name: string, value: string | number) => {
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <div className="flex gap-2">
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <Sparkles className="h-4 w-4 animate-pulse" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {fields.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
              <h4 className="text-sm font-medium">Opções Adicionais</h4>
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onChange={(e) =>
                        handleOptionChange(field.name, e.target.value)
                      }
                      disabled={isLoading}
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleOptionChange(
                          field.name,
                          field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                        )
                      }
                      disabled={isLoading}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </form>
    </Card>
  );
}
