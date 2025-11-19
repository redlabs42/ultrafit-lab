# Guia de Referência - Bibliotecas Frontend

Este documento contém exemplos práticos de uso das principais bibliotecas do projeto.

## 📚 Índice

- [React Hook Form + Zod](#react-hook-form--zod)
- [Zustand](#zustand)
- [React Query](#react-query)
- [Axios](#axios)
- [Sonner (Toasts)](#sonner-toasts)
- [next-themes (Dark Mode)](#next-themes-dark-mode)
- [date-fns](#date-fns)

---

## React Hook Form + Zod

### Exemplo: Formulário de Cadastro de Treino

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const treinoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  duracao: z.number().min(10, "Duração mínima de 10 minutos"),
  tipo: z.enum(["cardio", "força", "flexibilidade"]),
});

type TreinoFormData = z.infer<typeof treinoSchema>;

export function TreinoForm() {
  const form = useForm<TreinoFormData>({
    resolver: zodResolver(treinoSchema),
    defaultValues: {
      nome: "",
      duracao: 0,
      tipo: "cardio",
    },
  });

  const onSubmit = (data: TreinoFormData) => {
    console.log(data);
    // Enviar para API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Treino</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
```

**Documentação:**

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Shadcn Form](https://ui.shadcn.com/docs/components/form)

---

## Zustand

### Exemplo: Store de Autenticação

```tsx
// stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

// Uso no componente
import { useAuthStore } from "@/stores/auth-store";

export function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>Olá, {user?.name}</p>
      <Button onClick={logout}>Sair</Button>
    </div>
  );
}
```

**Documentação:**

- [Zustand](https://zustand-demo.pmnd.rs/)

---

## React Query

### Exemplo: Buscar Dados de Treinos

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

// Hook customizado
export function useTreinos() {
  return useQuery({
    queryKey: ["treinos"],
    queryFn: async () => {
      const { data } = await axios.get("/api/treinos");
      return data;
    },
  });
}

// Mutation (criar/atualizar)
export function useCreateTreino() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (treino: Treino) => {
      const { data } = await axios.post("/api/treinos", treino);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treinos"] });
    },
  });
}

// Uso no componente
export function TreinosList() {
  const { data, isLoading, error } = useTreinos();
  const createTreino = useCreateTreino();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  return (
    <div>
      {data?.map((treino) => (
        <div key={treino.id}>{treino.nome}</div>
      ))}
    </div>
  );
}
```

**Documentação:**

- [React Query](https://tanstack.com/query/latest)

---

## Axios

### Configuração Base

```tsx
// lib/axios.ts
import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 10000,
});

// Interceptor para adicionar token
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as axios };
```

**Documentação:**

- [Axios](https://axios-http.com/)

---

## Sonner (Toasts)

### Configuração e Uso

```tsx
// app/layout.tsx - Adicionar Toaster
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// Uso em componentes
import { toast } from "sonner";

// Sucesso
toast.success("Treino salvo com sucesso!");

// Erro
toast.error("Erro ao salvar treino");

// Loading
const toastId = toast.loading("Salvando...");
// ... depois
toast.success("Salvo!", { id: toastId });

// Customizado
toast("Treino criado", {
  description: "Seu novo treino está disponível",
  action: {
    label: "Ver",
    onClick: () => console.log("Ver treino"),
  },
});
```

**Documentação:**

- [Sonner](https://sonner.emilkowal.ski/)
- [Shadcn Toast](https://ui.shadcn.com/docs/components/sonner)

---

## next-themes (Dark Mode)

### Configuração

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Componente para alternar tema
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

**Documentação:**

- [next-themes](https://github.com/pacocoursey/next-themes)

---

## date-fns

### Exemplos Comuns

```tsx
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Formatação
format(new Date(), "dd/MM/yyyy"); // "18/11/2024"
format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR }); // "segunda-feira, 18 de novembro"

// Operações
addDays(new Date(), 7); // Adiciona 7 dias
differenceInDays(new Date("2024-12-01"), new Date()); // Diferença em dias

// Parsing
const date = parseISO("2024-11-18T10:00:00Z");

// Formatação de treinos/agendamentos
const proximoTreino = addDays(new Date(), 1);
format(proximoTreino, "EEEE 'às' HH:mm", { locale: ptBR });
```

**Documentação:**

- [date-fns](https://date-fns.org/)
- [date-fns Locales](https://github.com/date-fns/date-fns/tree/main/src/locale)

---

## 🔗 Links Úteis

- [Shadcn UI Components](https://ui.shadcn.com/docs/components)
- [React Hook Form Docs](https://react-hook-form.com/docs)
- [Zod Schema Reference](https://zod.dev/?id=primitives)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand Docs](https://zustand-demo.pmnd.rs/getting-started/introduction)

---

**Última atualização**: Novembro 2024
