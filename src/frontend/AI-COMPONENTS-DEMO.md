# 🤖 Componentes de IA - Guia de Uso

## Visão Geral

A Fase 8 implementou uma suite completa de componentes para integração com IA, incluindo feedback visual, chat assistant e geração de conteúdo.

---

## 📦 Componentes Disponíveis

### 1. GenerationProgress

Exibe o progresso de geração com IA com stages animados.

**Uso:**
```tsx
import { GenerationProgress } from '@/components/ai/GenerationProgress';

<GenerationProgress
  isGenerating={true}
  progress={45}
  title="Gerando Plano de Treino"
  description="Nossa IA está criando um plano personalizado"
/>
```

**Props:**
- `isGenerating`: boolean - Se está gerando
- `progress`: number (0-100) - Progresso atual
- `stage`: string (opcional) - Stage customizado
- `title`: string (opcional) - Título
- `description`: string (opcional) - Descrição

**Features:**
- ✅ Progress bar animado
- ✅ 5 stages pré-definidos
- ✅ Ícones animados
- ✅ Estado de conclusão
- ✅ Feedback visual por etapa

---

### 2. AIAssistant

Chat interface completa com IA.

**Uso:**
```tsx
import { AIAssistant } from '@/components/ai/AIAssistant';

<AIAssistant
  context="nutrition"
  title="Assistente de Nutrição"
  description="Tire suas dúvidas sobre alimentação"
/>
```

**Props:**
- `context`: 'nutrition' | 'workout' | 'general' - Contexto do chat
- `title`: string (opcional) - Título
- `description`: string (opcional) - Descrição

**Features:**
- ✅ Interface de chat completa
- ✅ Mensagens de usuário e assistente
- ✅ Scroll automático
- ✅ Loading state
- ✅ Context-aware
- ✅ Enter para enviar

---

### 3. GeneratedContent

Exibe conteúdo gerado com ações.

**Uso:**
```tsx
import { GeneratedContent } from '@/components/ai/GeneratedContent';

<GeneratedContent
  title="Plano Gerado"
  content={generatedPlan}
  type="nutrition"
  onRegenerate={() => regenerate()}
  onAccept={() => savePlan()}
/>
```

**Props:**
- `title`: string (opcional) - Título
- `content`: any - Conteúdo gerado
- `type`: 'nutrition' | 'workout' | 'text' - Tipo de conteúdo
- `onRegenerate`: function (opcional) - Callback para regenerar
- `onAccept`: function (opcional) - Callback para aceitar
- `isRegenerating`: boolean (opcional) - Estado de regeneração

**Features:**
- ✅ Visualização formatada
- ✅ Botão de aceitar
- ✅ Botão de regenerar
- ✅ Copiar para clipboard
- ✅ Download como JSON
- ✅ Badge de identificação

---

### 4. AIPromptForm

Formulário customizável para prompts de IA.

**Uso:**
```tsx
import { AIPromptForm } from '@/components/ai/AIPromptForm';

<AIPromptForm
  onSubmit={(prompt, options) => generate(prompt, options)}
  isLoading={isGenerating}
  placeholder="Descreva o que você precisa..."
  fields={[
    {
      name: 'experience',
      label: 'Nível',
      type: 'select',
      options: ['Iniciante', 'Intermediário', 'Avançado']
    }
  ]}
/>
```

**Props:**
- `onSubmit`: function - Callback com prompt e opções
- `isLoading`: boolean (opcional) - Estado de loading
- `title`: string (opcional) - Título
- `description`: string (opcional) - Descrição
- `placeholder`: string (opcional) - Placeholder do input
- `fields`: array (opcional) - Campos adicionais

**Features:**
- ✅ Input de prompt
- ✅ Campos dinâmicos
- ✅ Validação
- ✅ Loading state
- ✅ Enter para enviar

---

## 🎯 Hooks Disponíveis

### useGenerateNutritionWithAI

```tsx
import { useGenerateNutritionWithAI } from '@/hooks/useAI';

const generateMutation = useGenerateNutritionWithAI();

generateMutation.mutate({
  goal: 'weight_loss',
  dietaryRestrictions: ['lactose'],
  preferences: ['chicken', 'rice'],
  targetCalories: 2000,
  mealsPerDay: 4
});
```

### useGenerateWorkoutWithAI

```tsx
import { useGenerateWorkoutWithAI } from '@/hooks/useAI';

const generateMutation = useGenerateWorkoutWithAI();

generateMutation.mutate({
  goal: 'Ganhar massa muscular',
  experience: 'intermediate',
  daysPerWeek: 4,
  equipment: ['dumbbells', 'barbell'],
  focusAreas: ['chest', 'back'],
  duration: 60
});
```

### useAIChat

```tsx
import { useAIChat } from '@/hooks/useAI';

const chatMutation = useAIChat();

chatMutation.mutate({
  messages: [
    { role: 'user', content: 'Como ganhar massa muscular?' }
  ],
  context: 'workout'
});
```

---

## 🎨 Exemplos de Integração

### Exemplo 1: Geração com Progress

```tsx
'use client';

import { useState } from 'react';
import { GenerationProgress } from '@/components/ai/GenerationProgress';
import { useGenerateWorkoutWithAI } from '@/hooks/useAI';

export function WorkoutGenerator() {
  const [progress, setProgress] = useState(0);
  const generateMutation = useGenerateWorkoutWithAI();

  const handleGenerate = () => {
    setProgress(0);
    
    // Simular progresso
    const interval = setInterval(() => {
      setProgress(prev => prev >= 90 ? 90 : prev + 10);
    }, 500);

    generateMutation.mutate(data, {
      onSuccess: () => {
        clearInterval(interval);
        setProgress(100);
      }
    });
  };

  return (
    <GenerationProgress
      isGenerating={generateMutation.isPending}
      progress={progress}
    />
  );
}
```

### Exemplo 2: Chat Assistant

```tsx
'use client';

import { AIAssistant } from '@/components/ai/AIAssistant';

export function NutritionChat() {
  return (
    <div className="max-w-2xl mx-auto">
      <AIAssistant
        context="nutrition"
        title="Nutricionista IA"
        description="Pergunte sobre alimentação e nutrição"
      />
    </div>
  );
}
```

### Exemplo 3: Conteúdo Gerado

```tsx
'use client';

import { useState } from 'react';
import { GeneratedContent } from '@/components/ai/GeneratedContent';

export function PlanReview() {
  const [plan, setPlan] = useState(generatedPlan);

  return (
    <GeneratedContent
      title="Seu Plano Personalizado"
      content={plan}
      type="nutrition"
      onRegenerate={() => regenerate()}
      onAccept={() => savePlan(plan)}
    />
  );
}
```

---

## 🚀 Fluxo Completo de Geração

```tsx
'use client';

import { useState } from 'react';
import { GenerationProgress } from '@/components/ai/GenerationProgress';
import { GeneratedContent } from '@/components/ai/GeneratedContent';
import { useGenerateWorkoutWithAI } from '@/hooks/useAI';

export function CompleteFlow() {
  const [progress, setProgress] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const generateMutation = useGenerateWorkoutWithAI();

  const handleGenerate = (data) => {
    setProgress(0);
    setGeneratedPlan(null);
    
    const interval = setInterval(() => {
      setProgress(prev => prev >= 90 ? 90 : prev + 10);
    }, 500);

    generateMutation.mutate(data, {
      onSuccess: (plan) => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setGeneratedPlan(plan);
        }, 1000);
      }
    });
  };

  if (generateMutation.isPending || progress > 0) {
    return <GenerationProgress isGenerating={true} progress={progress} />;
  }

  if (generatedPlan) {
    return (
      <GeneratedContent
        content={generatedPlan}
        type="workout"
        onRegenerate={() => handleGenerate(lastData)}
        onAccept={() => savePlan(generatedPlan)}
      />
    );
  }

  return <FormComponent onSubmit={handleGenerate} />;
}
```

---

## 🎨 Customização

### Cores e Temas

Todos os componentes usam as variáveis do Tailwind e suportam dark mode automaticamente.

### Animações

- Progress bar: transição suave
- Ícones: pulse e spin
- Stages: fade in/out
- Chat: scroll suave

### Responsividade

Todos os componentes são totalmente responsivos:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 📝 Boas Práticas

1. **Progress Simulation**: Sempre simule progresso para melhor UX
2. **Error Handling**: Trate erros com toasts
3. **Loading States**: Use disabled states durante loading
4. **Feedback Visual**: Sempre dê feedback ao usuário
5. **Context**: Use context apropriado no chat
6. **Cleanup**: Limpe intervals e timeouts

---

## 🔧 Troubleshooting

### Progress não atualiza
- Verifique se está usando state corretamente
- Limpe intervals no cleanup

### Chat não envia mensagens
- Verifique se o endpoint está configurado
- Verifique se há token de autenticação

### Conteúdo não renderiza
- Verifique o tipo de conteúdo
- Verifique se o JSON é válido

---

## 🎉 Conclusão

Os componentes de IA estão prontos para uso e totalmente integrados com o resto da aplicação. Eles fornecem uma experiência de usuário moderna e profissional para geração de conteúdo com IA.

**Features principais:**
- ✅ Feedback visual rico
- ✅ Loading states elegantes
- ✅ Chat funcional
- ✅ Ações sobre conteúdo gerado
- ✅ Totalmente customizável
- ✅ TypeScript completo
- ✅ Responsivo
- ✅ Dark mode
