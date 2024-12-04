import AppButton from "@/components/AppButton";
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from 'expo-router';
import React from 'react';
import { Button, Card, ScrollView, Separator, Spinner, Text, XStack, YStack } from 'tamagui';
import { useSession } from '../context';
import { getColorByStatus, convertStatusToLabel } from '@/utils/status';
import { API_URL } from '@/config/api';

enum ProductionOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}

enum OrderStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}

interface Order {
  id: string;
  tableNumber: number;
  customer: string;
  status: OrderStatus;
  totalAmount: number;
  openedAt: string;
}

interface MenuItem {
  id: string;
  description: string;
  price: number;
  category: "FOOD" | "DRINK";
  imageUrl?: string;
}

interface ProductionOrder {
  id: string;
  orderId: string;
  status: string;
  type: string;
  menuItem: MenuItem;
  order: Order;
}

const fetchOrdersByStatus = async ({ token, status }: { token?: string | null, status: OrderStatus }): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/order/status/${status}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

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

const fetchProductionOrdersByStatus = async ({ token, status }: { token?: string | null, status: ProductionOrderStatus }): Promise<ProductionOrder[]> => {
  const response = await fetch(`${API_URL}/production-order/status/${status}`, {
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

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { session, signOut } = useSession();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrdersByStatus({ token: session, status: OrderStatus.OPENED }),
  });

  const { data: productionOrders, isLoading: productionOrdersLoading } = useQuery({
    queryKey: ["productionOrders"],
    queryFn: () => fetchProductionOrders({ token: session }),
  });

  const { data: productionOrdersToDeliver, isLoading: pendingProductionOrdersLoading } = useQuery({
    queryKey: ["pendingProductionOrders"],
    queryFn: () => fetchProductionOrdersByStatus({ token: session, status: ProductionOrderStatus.COMPLETED }),
  });

  const markAsDeliveredMutation = useMutation({
    mutationFn: async (productionOrderId: string) => {
      const response = await fetch(`${API_URL}/production-order/${productionOrderId}/delivered`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to mark order as delivered");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productionOrders"] });
      queryClient.invalidateQueries({ queryKey: ["pendingProductionOrders"] });
    },
    onError: (error) => {
      console.error("Error marking order as delivered:", error);
    },
  });

  const closeOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await fetch(`${API_URL}/order/${orderId}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to close order");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["productionOrders"] });
      queryClient.invalidateQueries({ queryKey: ["pendingProductionOrders"] });
    },
    onError: (error) => {
      console.error("Error closing order:", error);
    },
  });

  const handleCreateOrder = () => {
    router.push("/order");
  };

  const handleCloseOrder = (orderId: string) => {
    closeOrderMutation.mutate(orderId);
  };

  if (ordersLoading || productionOrdersLoading || pendingProductionOrdersLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <XStack justifyContent="space-between" alignItems="center" paddingVertical="$4">
        <Text fontSize="$8" fontWeight="$16">Dashboard</Text>
        <Button onPress={signOut}>Sign Out</Button>
      </XStack>

      <AppButton
        marginBottom="$4"
        title="Abrir nova comanda"
        onPress={handleCreateOrder}
      >
        Abrir nova comanda
      </AppButton>

      <ScrollView>
        <Card bordered size="$4" marginBottom="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Comandas Abertas ({orders?.length || 0})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            <ScrollView maxHeight={300}>
              {orders?.map((order) => (
                <Card key={order.id} bordered size="$4" theme="dark">
                  <Card.Header padded>
                    <XStack justifyContent="space-between" alignItems="center">
                      <XStack alignItems="center" gap="$2">
                        <Ionicons name="restaurant-outline" size={24} color="#666" />
                        <Text>Mesa {order.tableNumber} - <Text fontWeight="bold">#{order.id.slice(0, 8)}</Text></Text>
                      </XStack>
                      <Text>R$ {order.totalAmount || '0.00'}</Text>
                      <Text>{convertStatusToLabel(order.status)}</Text>
                    </XStack>
                  </Card.Header>
                  <Card.Footer padded display="flex" justifyContent="space-between" alignItems="center">
                    <XStack justifyContent="space-between" gap="$2">
                      <Text fontSize="$3" color="$gray11" fontWeight="bold">{order.customer}</Text>
                      <Text fontSize="$3" color="$gray11">
                        {new Date(order.openedAt).toLocaleTimeString()}
                      </Text>
                    </XStack>
                    <Button onPress={() => handleCloseOrder(order.id)} disabled={closeOrderMutation.isPending}>
                      {closeOrderMutation.isPending ? "Fechando..." : "Fechar comanda"}
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </ScrollView>

          </YStack>
        </Card>

        <Card bordered size="$4" marginBottom="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Prontos para entrega: ({productionOrdersToDeliver?.length || 0})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            <ScrollView maxHeight={300}>
              {productionOrdersToDeliver?.map((order) => (
                <Card key={order.id} bordered size="$4">
                  <Card.Header padded>
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text>{order.menuItem?.description} - Status: {convertStatusToLabel(order.status)}</Text>
                      <Button
                        size="$2"
                        theme="green"
                        onPress={() => markAsDeliveredMutation.mutate(order.id)}
                        disabled={markAsDeliveredMutation.isPending}
                      >
                        {markAsDeliveredMutation.isPending ? "Entregando..." : "Marcar como entregue"}
                      </Button>
                    </XStack>
                  </Card.Header>
                  <Card.Footer padded backgroundColor="$gray3" display="flex" justifyContent="space-between" alignItems="center">
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
                          color={getColorByStatus(order.status).text}
                        >
                          {convertStatusToLabel(order.status)}
                        </Text>
                      </XStack>
                    </XStack>
                    <Text>Mesa: {order.order.tableNumber}</Text>
                  </Card.Footer>
                </Card>
              ))}
            </ScrollView>
          </YStack>
        </Card>

        <Card bordered size="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Em Preparo ({productionOrders?.filter(order => order.status === ProductionOrderStatus.PENDING || order.status === ProductionOrderStatus.IN_PROGRESS).length || 0})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            <ScrollView maxHeight={300}>
              {productionOrders?.filter(order => order.status === ProductionOrderStatus.PENDING || order.status === ProductionOrderStatus.IN_PROGRESS).map((order) => (
                <Card key={order.id} bordered size="$4">
                  <Card.Header padded>
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text>{order.menuItem?.description} - Status: {convertStatusToLabel(order.status)}</Text>
                      {order.status === "COMPLETED" && (
                        <Button
                          size="$2"
                          theme="green"
                          onPress={() => markAsDeliveredMutation.mutate(order.id)}
                          disabled={markAsDeliveredMutation.isPending}
                        >
                          {markAsDeliveredMutation.isPending ? "Delivering..." : "Mark as Delivered"}
                        </Button>
                      )}
                    </XStack>
                  </Card.Header>
                  <Card.Footer padded backgroundColor="$gray3" display="flex" justifyContent="space-between" alignItems="center">
                    <XStack display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize="$3" color="$gray11">Status: </Text>
                      <XStack
                        backgroundColor={getColorByStatus(order.status).bg}
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$4"
                      >
                        <Text
                          fontSize="$2"
                          color={getColorByStatus(order.status).text}
                        >
                          {convertStatusToLabel(order.status)}
                        </Text>
                      </XStack>
                    </XStack>
                    <Text>Mesa: {order.order.tableNumber}</Text>
                  </Card.Footer>
                </Card>
              ))}
            </ScrollView>
          </YStack>
        </Card>

        <Card bordered size="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Outras ordens de produção ({productionOrders?.filter(order => order.status === ProductionOrderStatus.CANCELLED || order.status === ProductionOrderStatus.DELIVERED).length || 0})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            <ScrollView maxHeight={300}>
              {productionOrders?.filter(order => order.status === ProductionOrderStatus.CANCELLED || order.status === ProductionOrderStatus.DELIVERED).map((order) => (
                <Card key={order.id} bordered size="$4">
                  <Card.Header padded>
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text>{order.menuItem?.description} - Status: {convertStatusToLabel(order.status)}</Text>
                      {order.status === "COMPLETED" && (
                        <Button
                          size="$2"
                          theme="green"
                          onPress={() => markAsDeliveredMutation.mutate(order.id)}
                          disabled={markAsDeliveredMutation.isPending}
                        >
                          {markAsDeliveredMutation.isPending ? "Delivering..." : "Mark as Delivered"}
                        </Button>
                      )}
                    </XStack>
                  </Card.Header>
                  <Card.Footer padded backgroundColor="$gray3" display="flex" justifyContent="space-between" alignItems="center">
                    <XStack display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize="$3" color="$gray11">Status: </Text>
                      <XStack
                        backgroundColor={getColorByStatus(order.status).bg}
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$4"
                      >
                        <Text
                          fontSize="$2"
                          color={getColorByStatus(order.status).text}
                        >
                          {convertStatusToLabel(order.status)}
                        </Text>
                      </XStack>
                    </XStack>
                    <Text>Mesa: {order.order.tableNumber}</Text>
                  </Card.Footer>
                </Card>
              ))}
            </ScrollView>
          </YStack>
        </Card>
      </ScrollView>
    </YStack >
  );
}