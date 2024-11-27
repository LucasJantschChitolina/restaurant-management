import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Button, Input, Text, XStack, YStack, ScrollView, Spinner } from "tamagui";
import { useSession } from "../context";
import OrderSummary from "@/components/OrderSummary";
import MenuItemComponent from "@/components/MenuItemComponent";

export interface MenuItem {
  id: string;
  description: string;
  price: number;
  category: "FOOD" | "DRINK";
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

interface CreateOrderData {
  tableNumber: number;
  customer: string;
  status: string;
  waiterId: string;
}

const fetchMenuItems = async ({ token }: { token?: string | null }): Promise<MenuItem[]> => {
  const response = await fetch("http://localhost:4000/menu-item", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const createOrder = async ({ token, data }: { token?: string | null; data: CreateOrderData }): Promise<any> => {
  const response = await fetch("http://localhost:4000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

const createProductionOrder = async ({ token, data }: { token?: string | null; data: { orderId: string; status: string; menuItemId: string } }): Promise<any> => {
  const response = await fetch("http://localhost:4000/production-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    console.error("Failed to create production order: ", response);
    throw new Error("Failed to create production order");
  }

  return response.json();
};

const Order = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"FOOD" | "DRINK" | "ALL">("ALL");
  const [orderItems, setOrderItems] = useState<{ [key: string]: OrderItem }>({});
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");

  const { data: menuItems, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: () => fetchMenuItems({ token: session }),
  });

  async function handleCreateOrder() {
    if (!tableNumber) {
      alert("Por favor, informe o número da mesa");
      return;
    }

    if (!customer) {
      alert("Por favor, informe o nome do cliente");
      return;
    }

    if (Object.keys(orderItems).length === 0) {
      alert("Por favor, adicione itens ao pedido");
      return;
    }

    try {
      const order = await createOrder({
        token: session,
        data: {
          tableNumber: parseInt(tableNumber),
          customer: customer,
          status: "OPENED",
          waiterId: "f91b7248-ef32-4974-9070-0d7c3c9dbde9", // TODO: get waiter id from session
        }
      });

      const productionOrderPromises = Object.values(orderItems)
        .flatMap(({ item, quantity }) =>
          Array.from({ length: quantity }, () =>
            createProductionOrder({
              token: session,
              data: {
                orderId: order.id,
                status: "PENDING",
                menuItemId: item.id,
              },
            })
          )
        );

      await Promise.all(productionOrderPromises);

      handleCancelOrder();
    } catch (error) {
      console.error("Failed to create order: ", error);
      alert("Erro ao criar pedido");
    }
  }

  function handleCancelOrder() {
    setFilter("ALL");
    setOrderItems({});
    setIsSummaryVisible(false);
    setTableNumber("");
    setCustomer("");
    queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    router.back();
  }

  function handleAddToOrder(item: MenuItem) {
    setOrderItems(prevOrderItems => {
      const existingItem = prevOrderItems[item.id];
      const quantity = existingItem ? existingItem.quantity + 1 : 1;
      return { ...prevOrderItems, [item.id]: { item, quantity } };
    });
  }

  function handleRemoveFromOrder(item: MenuItem) {
    setOrderItems(prevOrderItems => {
      const existingItem = prevOrderItems[item.id];
      if (existingItem) {
        const quantity = existingItem.quantity - 1;
        if (quantity > 0) {
          return { ...prevOrderItems, [item.id]: { item, quantity } };
        } else {
          const { [item.id]: _, ...rest } = prevOrderItems;
          return rest;
        }
      }
      return prevOrderItems;
    });
  }

  const filteredItems = useMemo(() => {
    return menuItems?.filter((item) => filter === "ALL" || item.category === filter);
  }, [menuItems, filter]);

  const totalAmount = useMemo(() => {
    return Object.values(orderItems).reduce((total, { item, quantity }) => total + item.price * quantity, 0);
  }, [orderItems]);
  if (isLoading) return (
    <YStack flex={1} justifyContent="center" alignItems="center"><Spinner size="large" /></YStack>
  );

  if (error) return (
    <YStack flex={1} justifyContent="center" alignItems="center"><Text>Error loading menu items</Text></YStack>
  );

  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      {isSummaryVisible ? (
        <OrderSummary
          orderItems={orderItems}
          totalAmount={totalAmount}
          onConfirm={handleCreateOrder}
          onCancel={() => setIsSummaryVisible(false)}
        />
      ) : (
        <>
          <XStack alignItems="center" justifyContent="space-between" paddingVertical="$4">
            <Text fontSize="$8" fontWeight="$16">Comanda</Text>
            <Button color="$red10" onPress={handleCancelOrder}>cancelar pedido</Button>
          </XStack>

          <YStack gap="$2">
            <Input
              placeholder="Mesa"
              value={tableNumber}
              onChangeText={setTableNumber}
              keyboardType="numeric"
            />
            <Input
              placeholder="Cliente"
              value={customer}
              onChangeText={setCustomer}
            />
          </YStack>

          <XStack justifyContent="center" paddingVertical="$4" gap="$2">
            <Button onPress={() => setFilter("ALL")}> Todos</Button>
            <Button onPress={() => setFilter("FOOD")}>🍔 Comidas</Button>
            <Button onPress={() => setFilter("DRINK")}>🍻 Bebidas</Button>
          </XStack>
          <ScrollView>
            {filteredItems?.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                quantity={orderItems[item.id]?.quantity || 0}
                onAdd={() => handleAddToOrder(item)}
                onRemove={() => handleRemoveFromOrder(item)}
              />
            ))}
          </ScrollView>
          <Button
            marginTop="$4"
            disabled={Object.keys(orderItems).length === 0}
            onPress={() => setIsSummaryVisible(true)}
          >
            Ver resumo da comanda (${totalAmount.toFixed(2)})
          </Button>
        </>
      )}
    </YStack>
  );
};
export default Order;