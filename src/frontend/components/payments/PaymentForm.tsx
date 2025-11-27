"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, CreditCard, MapPin, QrCode, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const creditCardSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão inválido"),
  cardHolderName: z.string().min(3, "Nome do titular é obrigatório"),
  expiryMonth: z.string().min(2, "Mês inválido"),
  expiryYear: z.string().min(2, "Ano inválido"),
  cvv: z.string().min(3, "CVV inválido"),
  email: z.string().email("E-mail inválido"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido"),
  phone: z.string().optional(),
  mobilePhone: z.string().min(11, "Celular inválido"),
  postalCode: z.string().min(8, "CEP inválido"),
  addressNumber: z.string().min(1, "Número é obrigatório"),
  addressComplement: z.string().optional(),
});

const pixSchema = z.object({
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido"),
});

type CreditCardFormData = z.infer<typeof creditCardSchema>;
type PixFormData = z.infer<typeof pixSchema>;

interface PaymentFormProps {
  onSubmitCreditCard: (data: CreditCardFormData) => void;
  onSubmitPix: (data: PixFormData) => void;
  isLoading?: boolean;
  pixCode?: string;
  pixQrCodeUrl?: string;
}

export function PaymentForm({
  onSubmitCreditCard,
  onSubmitPix,
  isLoading,
  pixCode,
  pixQrCodeUrl,
}: PaymentFormProps) {
  const [_paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">(
    "credit_card",
  );
  const [copied, setCopied] = useState(false);

  const {
    register: registerCC,
    handleSubmit: handleSubmitCC,
    formState: { errors: errorsCC },
  } = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
  });

  const {
    register: registerPix,
    handleSubmit: handleSubmitPix,
    formState: { errors: errorsPix },
  } = useForm<PixFormData>({
    resolver: zodResolver(pixSchema),
  });

  const handleCopyPix = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-glass-lg glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Método de Pagamento</CardTitle>
        <CardDescription>
          Escolha como você deseja pagar sua assinatura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="credit_card"
          onValueChange={(val) =>
            setPaymentMethod(val as "credit_card" | "pix")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-surface/50 p-1">
            <TabsTrigger
              value="credit_card"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Cartão de Crédito
            </TabsTrigger>
            <TabsTrigger
              value="pix"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <QrCode className="w-4 h-4 mr-2" />
              PIX
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit_card" className="mt-0 space-y-6">
            <form
              onSubmit={handleSubmitCC(onSubmitCreditCard)}
              className="space-y-6"
            >
              {/* Card Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CreditCard className="w-4 h-4" />
                  Dados do Cartão
                </div>
                <div className="space-y-4 p-4 rounded-xl bg-surface/30 border border-border/50">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        maxLength={16}
                        {...registerCC("cardNumber")}
                        className="!pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                    {errorsCC.cardNumber && (
                      <p className="text-xs text-destructive">
                        {errorsCC.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardHolderName">Nome no Cartão</Label>
                    <Input
                      id="cardHolderName"
                      placeholder="NOME COMO NO CARTÃO"
                      {...registerCC("cardHolderName")}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                    {errorsCC.cardHolderName && (
                      <p className="text-xs text-destructive">
                        {errorsCC.cardHolderName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Mês</Label>
                      <Input
                        id="expiryMonth"
                        placeholder="MM"
                        maxLength={2}
                        {...registerCC("expiryMonth")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.expiryMonth && (
                        <p className="text-xs text-destructive">
                          {errorsCC.expiryMonth.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Ano</Label>
                      <Input
                        id="expiryYear"
                        placeholder="AA"
                        maxLength={2}
                        {...registerCC("expiryYear")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.expiryYear && (
                        <p className="text-xs text-destructive">
                          {errorsCC.expiryYear.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        {...registerCC("cvv")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.cvv && (
                        <p className="text-xs text-destructive">
                          {errorsCC.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Holder Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <User className="w-4 h-4" />
                  Dados do Titular
                </div>
                <div className="space-y-4 p-4 rounded-xl bg-surface/30 border border-border/50">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...registerCC("email")}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                    {errorsCC.email && (
                      <p className="text-xs text-destructive">
                        {errorsCC.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                      <Input
                        id="cpfCnpj"
                        placeholder="000.000.000-00"
                        {...registerCC("cpfCnpj")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.cpfCnpj && (
                        <p className="text-xs text-destructive">
                          {errorsCC.cpfCnpj.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobilePhone">Celular</Label>
                      <Input
                        id="mobilePhone"
                        placeholder="(00) 00000-0000"
                        {...registerCC("mobilePhone")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.mobilePhone && (
                        <p className="text-xs text-destructive">
                          {errorsCC.mobilePhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <MapPin className="w-4 h-4" />
                  Endereço de Cobrança
                </div>
                <div className="space-y-4 p-4 rounded-xl bg-surface/30 border border-border/50">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="postalCode">CEP</Label>
                      <Input
                        id="postalCode"
                        placeholder="00000-000"
                        {...registerCC("postalCode")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.postalCode && (
                        <p className="text-xs text-destructive">
                          {errorsCC.postalCode.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="addressNumber">Número</Label>
                      <Input
                        id="addressNumber"
                        placeholder="123"
                        {...registerCC("addressNumber")}
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                      />
                      {errorsCC.addressNumber && (
                        <p className="text-xs text-destructive">
                          {errorsCC.addressNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressComplement">
                      Complemento (Opcional)
                    </Label>
                    <Input
                      id="addressComplement"
                      placeholder="Apto, Bloco, etc."
                      {...registerCC("addressComplement")}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Hidden phone field as fallback if mobile is provided */}
                  <input
                    type="hidden"
                    {...registerCC("phone")}
                    value="0000000000"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-liquid-primary mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Pagar com Cartão"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="pix" className="mt-0 space-y-6">
            {!pixCode ? (
              <div className="text-center space-y-6 py-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Pagamento via PIX</h3>
                  <p className="text-sm text-muted-foreground">
                    Ao clicar em "Gerar PIX", um código QR será gerado para você
                    efetuar o pagamento. A liberação é imediata após a
                    confirmação.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmitPix(onSubmitPix)}
                  className="space-y-4 text-left"
                >
                  <div className="space-y-2">
                    <Label htmlFor="pixCpfCnpj">
                      CPF/CNPJ para Nota Fiscal
                    </Label>
                    <Input
                      id="pixCpfCnpj"
                      placeholder="000.000.000-00"
                      {...registerPix("cpfCnpj")}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    />
                    {errorsPix.cpfCnpj && (
                      <p className="text-xs text-destructive">
                        {errorsPix.cpfCnpj.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-liquid-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Gerando PIX..." : "Gerar PIX para Pagamento"}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-success">
                    PIX Gerado com Sucesso!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Escaneie o QR Code ou copie o código abaixo para pagar.
                  </p>
                </div>

                {pixQrCodeUrl && (
                  <div className="flex justify-center p-4 bg-white rounded-xl shadow-sm max-w-[200px] mx-auto">
                    {/* Assuming pixQrCodeUrl is a base64 image or URL */}
                    <img
                      src={`data:image/png;base64,${pixQrCodeUrl}`}
                      alt="QR Code PIX"
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-xs">Código PIX Copia e Cola</Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={pixCode}
                      className="bg-background/50 font-mono text-xs h-9"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 shrink-0"
                      onClick={handleCopyPix}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <p className="text-xs text-primary font-medium">
                    Aguardando pagamento...
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Sua assinatura será ativada automaticamente assim que o
                    pagamento for confirmado.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
