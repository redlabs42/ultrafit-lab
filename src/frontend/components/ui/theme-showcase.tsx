"use client";

import { Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { difficultyColors, statusColors } from "@/lib/theme-utils";

/**
 * Componente de demonstração do sistema de tema
 * Use para visualizar todas as cores e variações
 */
export function ThemeShowcase() {
  const { isDark, setTheme, colors } = useTheme();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Tema UltraFit</h1>
          <p className="text-muted-foreground">
            Visualização de todas as cores e componentes
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Cores Principais */}
      <Card>
        <CardHeader>
          <CardTitle>Cores Principais</CardTitle>
          <CardDescription>
            Cores base do tema (modo {isDark ? "escuro" : "claro"})
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div
              className="h-20 rounded-lg bg-primary mb-2"
              style={{ backgroundColor: colors.primary }}
            />
            <p className="text-sm font-medium">Primary</p>
            <p className="text-xs text-muted-foreground">{colors.primary}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg bg-accent mb-2"
              style={{ backgroundColor: colors.accent }}
            />
            <p className="text-sm font-medium">Accent</p>
            <p className="text-xs text-muted-foreground">{colors.accent}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg bg-success mb-2"
              style={{ backgroundColor: colors.success }}
            />
            <p className="text-sm font-medium">Success</p>
            <p className="text-xs text-muted-foreground">{colors.success}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg bg-warning mb-2"
              style={{ backgroundColor: colors.warning }}
            />
            <p className="text-sm font-medium">Warning</p>
            <p className="text-xs text-muted-foreground">{colors.warning}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg bg-destructive mb-2"
              style={{ backgroundColor: colors.danger }}
            />
            <p className="text-sm font-medium">Danger</p>
            <p className="text-xs text-muted-foreground">{colors.danger}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg border-2"
              style={{ backgroundColor: colors.bg }}
            />
            <p className="text-sm font-medium">Background</p>
            <p className="text-xs text-muted-foreground">{colors.bg}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg border-2"
              style={{ backgroundColor: colors.bgAlt }}
            />
            <p className="text-sm font-medium">Background Alt</p>
            <p className="text-xs text-muted-foreground">{colors.bgAlt}</p>
          </div>
          <div>
            <div
              className="h-20 rounded-lg border-2 flex items-center justify-center"
              style={{ backgroundColor: colors.card }}
            >
              <span className="text-sm">Card</span>
            </div>
            <p className="text-sm font-medium">Card</p>
            <p className="text-xs text-muted-foreground">Com opacidade</p>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <Card>
        <CardHeader>
          <CardTitle>Botões</CardTitle>
          <CardDescription>Variações de botões com o tema</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button className="bg-success hover:bg-success/90">Success</Button>
          <Button className="bg-warning hover:bg-warning/90">Warning</Button>
        </CardContent>
      </Card>

      {/* Badges de Dificuldade */}
      <Card>
        <CardHeader>
          <CardTitle>Badges de Dificuldade</CardTitle>
          <CardDescription>Para exercícios e treinos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge className={difficultyColors.beginner}>Iniciante</Badge>
          <Badge className={difficultyColors.intermediate}>Intermediário</Badge>
          <Badge className={difficultyColors.advanced}>Avançado</Badge>
        </CardContent>
      </Card>

      {/* Badges de Status */}
      <Card>
        <CardHeader>
          <CardTitle>Badges de Status</CardTitle>
          <CardDescription>Estados e notificações</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge className={statusColors.active}>Ativo</Badge>
          <Badge className={statusColors.pending}>Pendente</Badge>
          <Badge className={statusColors.inactive}>Inativo</Badge>
          <Badge className={statusColors.error}>Erro</Badge>
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Notificações</CardTitle>
          <CardDescription>Mensagens contextuais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-success/10 text-success border border-success/20 rounded-lg p-4">
            ✓ Operação realizada com sucesso!
          </div>
          <div className="bg-warning/10 text-warning border border-warning/20 rounded-lg p-4">
            ⚠ Atenção: Verifique os dados antes de continuar
          </div>
          <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4">
            ✕ Erro ao processar sua solicitação
          </div>
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-4">
            ℹ Informação importante sobre sua conta
          </div>
        </CardContent>
      </Card>

      {/* Texto */}
      <Card>
        <CardHeader>
          <CardTitle>Tipografia</CardTitle>
          <CardDescription>Variações de texto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-foreground">Texto principal (foreground)</p>
          <p className="text-muted-foreground">Texto secundário (muted)</p>
          <p className="text-primary">Texto primário (azul)</p>
          <p className="text-accent">Texto de destaque (verde lima)</p>
          <p className="text-success">Texto de sucesso (verde)</p>
          <p className="text-warning">Texto de aviso (amarelo)</p>
          <p className="text-destructive">Texto de erro (vermelho)</p>
        </CardContent>
      </Card>
    </div>
  );
}
