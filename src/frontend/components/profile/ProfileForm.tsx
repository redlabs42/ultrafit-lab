"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  activityLevel: z
    .enum(["sedentary", "light", "moderate", "active", "very_active"])
    .optional(),
  goals: z.array(z.string()).optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  injuries: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  workoutFrequency: z.number().min(1).max(7).optional(),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const GOAL_OPTIONS = [
  { id: "weight_loss", label: "Perder Peso" },
  { id: "muscle_gain", label: "Ganhar Massa Muscular" },
  { id: "maintenance", label: "Manter Peso" },
  { id: "endurance", label: "Melhorar Resistência" },
  { id: "strength", label: "Aumentar Força" },
];

const DIETARY_OPTIONS = [
  { id: "vegetarian", label: "Vegetariano" },
  { id: "vegan", label: "Vegano" },
  { id: "gluten_free", label: "Sem Glúten" },
  { id: "lactose_free", label: "Sem Lactose" },
  { id: "nut_free", label: "Sem Nozes/Castanhas" },
];

const INJURY_OPTIONS = [
  { id: "knee", label: "Joelho" },
  { id: "back", label: "Costas" },
  { id: "shoulder", label: "Ombro" },
  { id: "wrist", label: "Punho" },
  { id: "ankle", label: "Tornozelo" },
];

const EQUIPMENT_OPTIONS = [
  { id: "gym", label: "Academia Completa" },
  { id: "dumbbells", label: "Halteres" },
  { id: "bands", label: "Elásticos" },
  { id: "bodyweight", label: "Peso do Corpo" },
  { id: "barbell", label: "Barra e Anilhas" },
];

export function ProfileForm() {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      goals: [],
      dietaryRestrictions: [],
      injuries: [],
      equipment: [],
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // TODO: Implement API call to update profile
    console.log("Profile update:", data);
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Seus dados básicos de identificação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" disabled {...register("email")} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input id="birthDate" type="date" {...register("birthDate")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gênero</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Physical Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Físicos</CardTitle>
          <CardDescription>
            Informações importantes para cálculos nutricionais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                {...register("height", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                step="0.1"
                {...register("weight", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nível de Atividade</Label>
            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível de atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">
                      Sedentário (pouco ou nenhum exercício)
                    </SelectItem>
                    <SelectItem value="light">
                      Levemente Ativo (exercício leve 1-3 dias/semana)
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderadamente Ativo (exercício moderado 3-5 dias/semana)
                    </SelectItem>
                    <SelectItem value="active">
                      Muito Ativo (exercício pesado 6-7 dias/semana)
                    </SelectItem>
                    <SelectItem value="very_active">
                      Extremamente Ativo (trabalho físico ou treino 2x/dia)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Nutrition */}
      <Card>
        <CardHeader>
          <CardTitle>Nutrição</CardTitle>
          <CardDescription>
            Preferências e restrições alimentares
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Objetivos</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOAL_OPTIONS.map((option) => (
                <Controller
                  key={option.id}
                  name="goals"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`goal-${option.id}`}
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            return checked
                              ? field.onChange([...currentValue, option.id])
                              : field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option.id,
                                  ),
                                );
                          }}
                        />
                        <Label htmlFor={`goal-${option.id}`}>
                          {option.label}
                        </Label>
                      </div>
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Restrições Alimentares</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIETARY_OPTIONS.map((option) => (
                <Controller
                  key={option.id}
                  name="dietaryRestrictions"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${option.id}`}
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            return checked
                              ? field.onChange([...currentValue, option.id])
                              : field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option.id,
                                  ),
                                );
                          }}
                        />
                        <Label htmlFor={`diet-${option.id}`}>
                          {option.label}
                        </Label>
                      </div>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training */}
      <Card>
        <CardHeader>
          <CardTitle>Treino</CardTitle>
          <CardDescription>
            Experiência e disponibilidade para treinos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nível de Experiência</Label>
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">
                        Intermediário
                      </SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workoutFrequency">
                Frequência Semanal (dias)
              </Label>
              <Input
                id="workoutFrequency"
                type="number"
                min={1}
                max={7}
                placeholder="3"
                {...register("workoutFrequency", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Equipamentos Disponíveis</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EQUIPMENT_OPTIONS.map((option) => (
                <Controller
                  key={option.id}
                  name="equipment"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`equip-${option.id}`}
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            return checked
                              ? field.onChange([...currentValue, option.id])
                              : field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option.id,
                                  ),
                                );
                          }}
                        />
                        <Label htmlFor={`equip-${option.id}`}>
                          {option.label}
                        </Label>
                      </div>
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Lesões ou Limitações</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INJURY_OPTIONS.map((option) => (
                <Controller
                  key={option.id}
                  name="injuries"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`injury-${option.id}`}
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            return checked
                              ? field.onChange([...currentValue, option.id])
                              : field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option.id,
                                  ),
                                );
                          }}
                        />
                        <Label htmlFor={`injury-${option.id}`}>
                          {option.label}
                        </Label>
                      </div>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full h-12 text-lg">
        Salvar Alterações
      </Button>
    </form>
  );
}
