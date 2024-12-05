import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, ScrollView, Separator, Spinner, Text, YStack, XStack, Image, Button } from "tamagui";
import { useSession } from '../context';
import { useState } from 'react';
import { convertStatusToLabel, getColorByStatus } from '@/utils/status';
import { API_URL } from '@/config/api';

const DEFAULT_IMAGE = "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=";

interface MenuItem {
  id: string;
  description: string;
  price: number;
  category: "FOOD" | "DRINK";
  imageUrl?: string;
}

interface Order {
  id: string;
  tableNumber: number;
}

interface ProductionOrder {
  id: string;
  orderId: string;
  status: string;
  type: "FOOD" | "DRINK";
  menuItem: MenuItem;
  order?: Order;
}

export enum ProductionOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}

interface GroupedOrders {
  [orderId: string]: ProductionOrder[];
}

const fetchProductionOrders = async ({ token }: { token?: string | null }): Promise<ProductionOrder[]> => {
  const response = await fetch(`${API_URL}/production-order`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch production orders");
  }

  return response.json();
};

const updateProductionOrderStatus = async (orderId: string, newStatus: string, token?: string | null) => {
  const response = await fetch(`${API_URL}/production-order/${orderId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update production order status");
  }

  return response.json();
};


const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "$yellow10";
    case "IN_PROGRESS":
      return "$blue10";
    case "COMPLETED":
      return "$green10";
    default:
      return "$red10";
  }
}

function Kitchen() {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { data: productionOrders, isLoading } = useQuery({
    queryKey: ["productionOrders"],
    queryFn: () => fetchProductionOrders({ token: session }),
  });

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const kitchenOrders = productionOrders?.filter(order =>
    order.type === "FOOD" && (selectedStatus ? order.status === selectedStatus : true)
  ) || [];

  const groupedOrders = kitchenOrders.reduce((acc: GroupedOrders, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = [];
    }
    acc[order.orderId].push(order);
    return acc;
  }, {});

  const handleStatusUpdate = async (orderId: string, currentStatus: string) => {
    const newStatus = currentStatus === "PENDING" ? "IN_PROGRESS" : "COMPLETED";
    try {
      await updateProductionOrderStatus(orderId, newStatus, session);
      queryClient.invalidateQueries({ queryKey: ["productionOrders"] });
      queryClient.invalidateQueries({ queryKey: ["pendingProductionOrders"] });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <Text fontSize="$8" fontWeight="$16" paddingVertical="$4">
        Cozinha ({kitchenOrders.length})
      </Text>
      <Text fontSize="$6" fontWeight="$14">
        Ordens de produção
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingVertical="$4" minHeight="fit-content">
        <Button
          marginHorizontal="$2"
          onPress={() => setSelectedStatus(null)}
        >
          Todos
        </Button>
        {Object.values(ProductionOrderStatus).map((status) => (
          <Button
            key={status}
            marginHorizontal="$2"
            onPress={() => setSelectedStatus(status)}
          >
            {convertStatusToLabel(status)}
          </Button>
        ))}
      </ScrollView>

      <ScrollView>
        <YStack padding="$2" gap="$4">

          {Object.entries(groupedOrders).map(([orderId, orders]) => (
            <Card key={orderId} bordered size="$4">
              <Card.Header padded>
                <XStack justifyContent="space-between">
                  <Text fontSize="$6" fontWeight="$14">
                    Comanda #{orderId.slice(0, 8)}
                  </Text>
                  <Text fontSize="$6" fontWeight="$14" color="#D73035">
                    Mesa {orders[0]?.order?.tableNumber || '-'}
                  </Text>
                </XStack>
              </Card.Header>
              <Separator />
              <YStack padding="$2" gap="$2">
                {orders.map((order) => (
                  <Card key={order.id} bordered size="$4" theme="dark">
                    <Card.Header padded>
                      <XStack gap="$3" alignItems="center">
                        <Image
                          source={{ uri: order.menuItem?.imageUrl || DEFAULT_IMAGE }}
                          width={50}
                          height={50}
                          borderRadius={8}
                        />
                        <YStack flex={1}>
                          <Text fontWeight="bold">{order.menuItem?.description}</Text>
                        </YStack>
                      </XStack>
                    </Card.Header>
                    <Card.Footer padded backgroundColor="$gray3" display="flex" justifyContent="space-between">
                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$3" color="$gray11">Status: </Text>
                        <XStack
                          backgroundColor={getColorByStatus(order.status).bg}
                          paddingHorizontal="$2"
                          paddingVertical="$1"
                          borderRadius="$4"
                        >
                          <Text
                            fontSize="$2"
                            backgroundColor={getColorByStatus(order.status).bg}
                            color={getColorByStatus(order.status).text}
                          >
                            {convertStatusToLabel(order.status)}
                          </Text>
                        </XStack>

                      </XStack>
                      {order.status !== "COMPLETED" && order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                        <Button
                          onPress={() => handleStatusUpdate(order.id, order.status)}
                          backgroundColor="$green10"
                          color="white"
                          size="$2"
                        >
                          {order.status === "PENDING" ? "Produzir" : "Concluir"}
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                ))}
              </YStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

export default Kitchen;