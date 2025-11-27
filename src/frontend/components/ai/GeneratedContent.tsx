"use client";

import { CheckCircle2, Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GeneratedContentProps {
  title?: string;
  content: string | Record<string, unknown>;
  type: "nutrition" | "workout" | "text";
  onRegenerate?: () => void;
  onAccept?: () => void;
  isRegenerating?: boolean;
}

export function GeneratedContent({
  title = "Conteúdo Gerado",
  content,
  type,
  onRegenerate,
  onAccept,
  isRegenerating,
}: GeneratedContentProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    toast.success("Conteúdo copiado!");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-${Date.now()}.json`;
    a.click();
    toast.success("Download iniciado!");
  };

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            Gerado com IA
          </Badge>
        </div>
        <CardDescription>
          Revise o conteúdo gerado e faça ajustes se necessário
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 max-h-96 overflow-y-auto">
          {type === "text" ? (
            <p className="text-sm whitespace-pre-wrap">
              {typeof content === "string"
                ? content
                : JSON.stringify(content, null, 2)}
            </p>
          ) : (
            <pre className="text-xs">{JSON.stringify(content, null, 2)}</pre>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {onAccept && (
            <Button onClick={onAccept} className="flex-1">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Aceitar e Salvar
            </Button>
          )}

          {onRegenerate && (
            <Button
              onClick={onRegenerate}
              variant="outline"
              disabled={isRegenerating}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
              />
              Gerar Novamente
            </Button>
          )}

          <Button onClick={handleCopy} variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>

          <Button onClick={handleDownload} variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
