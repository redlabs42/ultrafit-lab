"use client";

import { useState } from "react";
import { Copy, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { NutritionPlan, Food } from "@/types";

interface ShoppingListDialogProps {
  plan: NutritionPlan;
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
}

export function ShoppingListDialog({ plan }: ShoppingListDialogProps) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Generate list when dialog opens
  const generateList = () => {
    const allFoods: Food[] = plan.meals.flatMap((meal) => meal.foods);

    // Simple aggregation by name and unit
    const aggregated = allFoods.reduce((acc, food) => {
      const key = `${food.name.toLowerCase()}-${food.unit.toLowerCase()}`;
      if (!acc[key]) {
        acc[key] = {
          id: key,
          name: food.name,
          quantity: 0,
          unit: food.unit,
          checked: false,
        };
      }
      acc[key].quantity += food.quantity;
      return acc;
    }, {} as Record<string, ShoppingItem>);

    setItems(
      Object.values(aggregated).sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const copyToClipboard = () => {
    const text = items
      .map(
        (item) =>
          `${item.checked ? "[x]" : "[ ]"} ${item.name}: ${item.quantity}${
            item.unit
          }`
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Lista copiada para a área de transferência!");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) generateList();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <ShoppingCart className="h-4 w-4" />
          Lista de Compras
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lista de Compras</DialogTitle>
          <DialogDescription>
            Ingredientes baseados no seu plano nutricional atual.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs h-8"
          >
            <Copy className="h-3 w-3 mr-1" /> Copiar Lista
          </Button>
        </div>

        <ScrollArea className="h-[300px] pr-4 rounded-md border p-2">
          <div className="space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <label
                    htmlFor={item.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                      item.checked ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({item.quantity}
                      {item.unit})
                    </span>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nenhum ingrediente encontrado.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
