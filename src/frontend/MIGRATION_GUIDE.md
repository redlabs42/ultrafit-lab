# 🔄 Guia de Migração - Liquid Glass

Guia prático para migrar componentes existentes para o Liquid Glass Design System.

## 📋 Checklist de Migração

### Antes de Começar
- [ ] Ler `QUICK_START_LIQUID_GLASS.md`
- [ ] Ver exemplos em `/demo`
- [ ] Testar formulário em `/form-example`
- [ ] Entender a paleta de cores

### Durante a Migração
- [ ] Substituir classes antigas por novas
- [ ] Testar em light e dark mode
- [ ] Verificar acessibilidade
- [ ] Testar responsividade

## 🎨 Substituições Comuns

### Cards

**Antes:**
```tsx
<div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
  Conteúdo
</div>
```

**Depois:**
```tsx
<div className="glass-card p-6">
  Conteúdo
</div>
```

### Botões

**Antes:**
```tsx
<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
  Salvar
</button>
```

**Depois:**
```tsx
<button className="btn-liquid-primary">
  Salvar
</button>
```

Ou usando o componente:
```tsx
import { Button } from "@/components/ui/button";

<Button>Salvar</Button>
```

### Inputs

**Antes:**
```tsx
<input 
  className="border rounded-lg px-4 py-2 w-full"
  placeholder="Nome"
/>
```

**Depois:**
```tsx
<input 
  className="input-glass"
  placeholder="Nome"
/>
```

Ou usando o componente:
```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Nome" />
```

### Select/Dropdown

**Antes:**
```tsx
<select className="border rounded-lg px-4 py-2 w-full">
  <option>Opção 1</option>
  <option>Opção 2</option>
</select>
```

**Depois:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

**Antes:**
```tsx
<input type="checkbox" id="terms" />
<label htmlFor="terms">Aceito os termos</label>
```

**Depois:**
```tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos</Label>
</div>
```

### Radio Buttons

**Antes:**
```tsx
<input type="radio" name="plan" value="free" id="free" />
<label htmlFor="free">Gratuito</label>
<input type="radio" name="plan" value="pro" id="pro" />
<label htmlFor="pro">Pro</label>
```

**Depois:**
```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

<RadioGroup defaultValue="free">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="free" id="free" />
    <Label htmlFor="free">Gratuito</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="pro" id="pro" />
    <Label htmlFor="pro">Pro</Label>
  </div>
</RadioGroup>
```

### Toggle/Switch

**Antes:**
```tsx
<input type="checkbox" className="toggle" />
```

**Depois:**
```tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

<div className="flex items-center justify-between">
  <Label htmlFor="notifications">Notificações</Label>
  <Switch id="notifications" />
</div>
```

### Badges

**Antes:**
```tsx
<span className="bg-green-100 text-green-800 px-2 py-1 rounded">
  Ativo
</span>
```

**Depois:**
```tsx
<span className="badge-floating badge-success">
  Ativo
</span>
```

Ou usando o componente:
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="success">Ativo</Badge>
```

### Modais

**Antes:**
```tsx
{isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6">
      Conteúdo
    </div>
  </div>
)}
```

**Depois:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <button>Abrir</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
    </DialogHeader>
    Conteúdo
  </DialogContent>
</Dialog>
```

## 🎨 Cores

### Texto

**Antes:**
```tsx
<p className="text-gray-600 dark:text-gray-400">Texto</p>
```

**Depois:**
```tsx
<p className="text-secondary">Texto</p>
```

Opções:
- `text-primary` - Texto principal
- `text-secondary` - Texto secundário
- `text-tertiary` - Texto terciário

### Backgrounds

**Antes:**
```tsx
<div className="bg-blue-500">Conteúdo</div>
```

**Depois:**
```tsx
<div className="bg-primary">Conteúdo</div>
```

Opções:
- `bg-primary` - Azul principal
- `bg-accent` - Verde destaque
- `bg-success` - Verde sucesso
- `bg-warning` - Amarelo aviso
- `bg-destructive` - Vermelho erro

### Borders

**Antes:**
```tsx
<div className="border border-gray-300 dark:border-gray-700">
  Conteúdo
</div>
```

**Depois:**
```tsx
<div className="border border-border">
  Conteúdo
</div>
```

## 🎭 Efeitos

### Hover Lift

**Antes:**
```tsx
<div className="hover:shadow-lg hover:-translate-y-1 transition">
  Card
</div>
```

**Depois:**
```tsx
<div className="glass-card hover-lift">
  Card
</div>
```

### Hover Scale

**Antes:**
```tsx
<button className="hover:scale-105 transition">
  Botão
</button>
```

**Depois:**
```tsx
<button className="btn-liquid-primary">
  Botão
</button>
```
(Scale já incluído)

### Hover Glow

**Depois:**
```tsx
<div className="glass-card hover-glow">
  Card
</div>
```

## 📱 Responsividade

### Container

**Antes:**
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  Conteúdo
</div>
```

**Depois:**
```tsx
<div className="max-w-6xl mx-auto p-6 md:p-12">
  Conteúdo
</div>
```

### Grid

**Antes:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  Cards
</div>
```

**Depois:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Cards
</div>
```

## 🔧 Formulários Completos

### Antes
```tsx
<form>
  <div>
    <label>Nome</label>
    <input type="text" />
  </div>
  <div>
    <label>Email</label>
    <input type="email" />
  </div>
  <button type="submit">Salvar</button>
</form>
```

### Depois
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Nome</Label>
    <Input id="name" type="text" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
  <Button type="submit">Salvar</Button>
</form>
```

## 🎯 Exemplo Completo de Migração

### Página Antes
```tsx
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Perfil</h1>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Nome</label>
              <input 
                type="text"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

### Página Depois
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="min-h-screen mesh-gradient p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" />
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## ✅ Checklist Pós-Migração

- [ ] Testar em light mode
- [ ] Testar em dark mode
- [ ] Testar em mobile
- [ ] Testar em tablet
- [ ] Testar em desktop
- [ ] Verificar acessibilidade (tab navigation)
- [ ] Verificar contraste de cores
- [ ] Testar hover effects
- [ ] Testar focus states
- [ ] Verificar loading states

## 🆘 Problemas Comuns

### Glass effect não aparece
- Verifique se `liquid-glass.css` está importado
- Limpe o cache do navegador
- Reinicie o servidor

### Cores não mudam no dark mode
- Verifique se está usando as variáveis CSS corretas
- Use `text-secondary` ao invés de `text-gray-600`

### Componente não encontrado
- Verifique o import path
- Certifique-se que o componente existe em `components/ui/`

## 📚 Recursos

- **Quick Start**: `QUICK_START_LIQUID_GLASS.md`
- **Progresso**: `PROGRESSO_LIQUID_GLASS.md`
- **Fase 4**: `FASE_4_COMPLETA.md`
- **Demo**: http://localhost:3000/demo
- **Form Example**: http://localhost:3000/form-example

---

**Boa migração!** 🚀
