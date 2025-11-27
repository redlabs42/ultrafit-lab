"use client";

import { HelpCircle, Moon, Sun, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";

/**
 * Componente de demonstração do Liquid Glass Design System
 * Mostra exemplos práticos de todos os elementos
 */
export function LiquidGlassDemo() {
  const { isDark, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  // Evita erro de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-12 mesh-gradient relative overflow-hidden">
      {/* Organic Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 via-warning/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="glass-card p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Liquid Glass Design System
              </h1>
              <p className="text-secondary text-lg">
                Inspirado no macOS • Elegante • Moderno
              </p>
            </div>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="btn-liquid-secondary"
                aria-label="Alternar tema"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Botões</h2>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-liquid-primary">
              <Zap className="h-4 w-4 mr-2 inline" />
              Primary Button
            </button>
            <button type="button" className="btn-liquid-secondary">
              Secondary Button
            </button>
            <button type="button" className="btn-liquid-ghost">
              Ghost Button
            </button>
            <button type="button" className="btn-liquid-primary" disabled>
              Disabled
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
          <div className="space-y-4 max-w-md">
            <input
              type="text"
              className="input-glass"
              placeholder="Digite seu nome"
            />
            <input
              type="email"
              className="input-glass"
              placeholder="seu@email.com"
            />
            <input
              type="text"
              className="input-glass"
              placeholder="Disabled"
              disabled
            />
          </div>
        </div>

        {/* Badges */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Badges</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary mb-2">Classes CSS:</p>
              <div className="flex flex-wrap gap-3">
                <span className="badge-floating badge-success">✓ Sucesso</span>
                <span className="badge-floating badge-warning">⚠ Aviso</span>
                <span className="badge-floating badge-danger">✕ Erro</span>
                <span className="badge-floating badge-info">ℹ Info</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-secondary mb-2">Componente Badge:</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Sucesso</Badge>
                <Badge variant="warning">Aviso</Badge>
                <Badge variant="danger">Erro</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Cards com Hover Effects */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Cards Interativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card hover-lift p-6">
              <h3 className="text-xl font-semibold mb-2">Hover Lift</h3>
              <p className="text-secondary">
                Card com efeito de elevação no hover
              </p>
            </div>
            <div className="glass-card hover-scale p-6">
              <h3 className="text-xl font-semibold mb-2">Hover Scale</h3>
              <p className="text-secondary">
                Card com efeito de escala no hover
              </p>
            </div>
            <div className="glass-card hover-glow p-6">
              <h3 className="text-xl font-semibold mb-2">Hover Glow</h3>
              <p className="text-secondary">
                Card com efeito de brilho no hover
              </p>
            </div>
          </div>
        </div>

        {/* Dialog/Modal */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dialog / Modal</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="btn-liquid-primary">
                Abrir Modal
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modal com Liquid Glass</DialogTitle>
                <DialogDescription>
                  Este modal usa glass effect com backdrop blur. Perfeito para
                  confirmações e formulários.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <input className="input-glass" placeholder="Digite algo..." />
                <Textarea
                  placeholder="Ou escreva mais texto aqui..."
                  rows={3}
                />
              </div>
              <DialogFooter>
                <button type="button" className="btn-liquid-secondary">
                  Cancelar
                </button>
                <button type="button" className="btn-liquid-primary">
                  Confirmar
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Textarea */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Textarea</h2>
          <div className="space-y-4 max-w-md">
            <Textarea placeholder="Digite uma mensagem..." rows={4} />
            <Textarea placeholder="Textarea desabilitado" rows={3} disabled />
          </div>
        </div>

        {/* Select */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Select</h2>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label>Escolha uma opção</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Opção 1</SelectItem>
                  <SelectItem value="option2">Opção 2</SelectItem>
                  <SelectItem value="option3">Opção 3</SelectItem>
                  <SelectItem value="option4">Opção 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Checkbox</h2>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Aceito os termos e condições</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing">Receber emails de marketing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled">Opção desabilitada</Label>
            </div>
          </div>
        </div>

        {/* Radio Group */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Radio Group</h2>
          <div className="space-y-4 max-w-md">
            <Label>Escolha um plano</Label>
            <RadioGroup defaultValue="pro">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free">Gratuito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pro" id="pro" />
                <Label htmlFor="pro">Pro - R$ 29/mês</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label htmlFor="enterprise">Enterprise - R$ 99/mês</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Switch */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Switch</h2>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notificações</Label>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-switch">Marketing</Label>
              <Switch id="marketing-switch" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="disabled-switch">Desabilitado</Label>
              <Switch id="disabled-switch" disabled />
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Alertas</h2>
          <div className="space-y-3">
            <div className="bg-success/10 text-success border border-success/20 rounded-glass p-4">
              <strong>Sucesso!</strong> Sua operação foi concluída com êxito.
            </div>
            <div className="bg-warning/10 text-warning border border-warning/20 rounded-glass p-4">
              <strong>Atenção!</strong> Verifique os dados antes de continuar.
            </div>
            <div className="bg-danger/10 text-danger border border-danger/20 rounded-glass p-4">
              <strong>Erro!</strong> Não foi possível processar sua solicitação.
            </div>
            <div className="bg-info/10 text-info border border-info/20 rounded-glass p-4">
              <strong>Informação:</strong> Sua conta será atualizada em breve.
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
          <div className="space-y-4">
            <div className="h-20 rounded-glass loading-shimmer" />
            <div className="h-20 rounded-glass loading-shimmer" />
          </div>
        </div>

        {/* Gradientes */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Gradientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gradient-primary rounded-glass-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Primary Gradient</h3>
              <p>Gradiente azul para CTAs importantes</p>
            </div>
            <div className="gradient-accent rounded-glass-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Accent Gradient</h3>
              <p>Gradiente verde para destaques</p>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-liquid-primary"
              onClick={() => {
                toast({
                  title: "Sucesso!",
                  description: "Sua ação foi concluída com êxito.",
                  variant: "success",
                });
              }}
            >
              Toast Sucesso
            </button>
            <button
              type="button"
              className="btn-liquid-secondary"
              onClick={() => {
                toast({
                  title: "Atenção",
                  description: "Verifique os dados antes de continuar.",
                  variant: "warning",
                });
              }}
            >
              Toast Aviso
            </button>
            <button
              type="button"
              className="btn-liquid-ghost"
              onClick={() => {
                toast({
                  title: "Erro",
                  description: "Não foi possível processar sua solicitação.",
                  variant: "destructive",
                });
              }}
            >
              Toast Erro
            </button>
          </div>
        </div>

        {/* Tooltip */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Tooltip</h2>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="btn-liquid-primary">
                    Hover me
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip com glass effect!</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-surface transition-colors"
                  >
                    <HelpCircle className="h-5 w-5 text-secondary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Precisa de ajuda?</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Tipografia */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Tipografia</h2>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <p className="text-base">
              Texto normal com boa legibilidade e espaçamento adequado.
            </p>
            <p className="text-secondary">
              Texto secundário para informações complementares.
            </p>
            <p className="text-tertiary">
              Texto terciário para detalhes sutis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
