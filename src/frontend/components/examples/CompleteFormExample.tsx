"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

/**
 * Exemplo de formulário completo usando todos os componentes Liquid Glass
 */
export function CompleteFormExample() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        goal: "",
        plan: "pro",
        notifications: true,
        terms: false,
        bio: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="min-h-screen p-6 md:p-12 mesh-gradient">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Configuração de Perfil</CardTitle>
                        <CardDescription>
                            Complete seu perfil para começar sua jornada fitness
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nome */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome completo</Label>
                                <Input
                                    id="name"
                                    placeholder="João Silva"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="joao@exemplo.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {/* Select - Objetivo */}
                            <div className="space-y-2">
                                <Label htmlFor="goal">Objetivo principal</Label>
                                <Select
                                    value={formData.goal}
                                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                                >
                                    <SelectTrigger id="goal">
                                        <SelectValue placeholder="Selecione seu objetivo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lose-weight">Perder peso</SelectItem>
                                        <SelectItem value="gain-muscle">Ganhar massa muscular</SelectItem>
                                        <SelectItem value="maintain">Manter forma</SelectItem>
                                        <SelectItem value="performance">Melhorar performance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Radio Group - Plano */}
                            <div className="space-y-3">
                                <Label>Escolha seu plano</Label>
                                <RadioGroup
                                    value={formData.plan}
                                    onValueChange={(value) => setFormData({ ...formData, plan: value })}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="free" id="free" />
                                        <Label htmlFor="free" variant="secondary">
                                            Gratuito - Recursos básicos
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pro" id="pro" />
                                        <Label htmlFor="pro" variant="secondary">
                                            Pro - R$ 29/mês - Todos os recursos
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="enterprise" id="enterprise" />
                                        <Label htmlFor="enterprise" variant="secondary">
                                            Enterprise - R$ 99/mês - Suporte premium
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Textarea - Bio */}
                            <div className="space-y-2">
                                <Label htmlFor="bio">Sobre você</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Conte um pouco sobre sua jornada fitness..."
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>

                            {/* Switch - Notificações */}
                            <div className="flex items-center justify-between p-4 glass-card">
                                <div className="space-y-0.5">
                                    <Label htmlFor="notifications">Notificações push</Label>
                                    <p className="text-sm text-secondary">
                                        Receba lembretes de treinos e nutrição
                                    </p>
                                </div>
                                <Switch
                                    id="notifications"
                                    checked={formData.notifications}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, notifications: checked })
                                    }
                                />
                            </div>

                            {/* Checkbox - Termos */}
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.terms}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, terms: checked as boolean })
                                    }
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="terms">
                                        Aceito os termos e condições
                                    </Label>
                                    <p className="text-sm text-tertiary">
                                        Você concorda com nossos Termos de Serviço e Política de Privacidade.
                                    </p>
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="secondary" className="flex-1">
                                    Cancelar
                                </Button>
                                <Button type="submit" className="flex-1" disabled={!formData.terms}>
                                    Salvar perfil
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
