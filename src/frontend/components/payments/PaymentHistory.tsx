"use client";

import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaymentHistory } from "@/hooks/usePayments";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Payment } from "@/types";

export function PaymentHistory() {
  const { data: payments, isLoading } = usePaymentHistory();

  const getStatusBadge = (status: Payment["status"]) => {
    const variants: Record<
      Payment["status"],
      {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline";
      }
    > = {
      confirmed: { label: "Confirmado", variant: "default" },
      pending: { label: "Pendente", variant: "secondary" },
      failed: { label: "Falhou", variant: "destructive" },
      refunded: { label: "Reembolsado", variant: "outline" },
    };

    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
        <CardDescription>
          Veja todos os seus pagamentos e faturas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : payments && payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.createdAt)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    {payment.invoiceUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={payment.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Fatura
                        </a>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum pagamento encontrado
          </p>
        )}
      </CardContent>
    </Card>
  );
}
