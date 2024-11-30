import { useQuery } from "@tanstack/react-query";
import { router } from 'expo-router';
import React from 'react';
import { Button, Card, ScrollView, Separator, Spinner, Text, View, XStack, YStack, Image } from 'tamagui';
import { useSession } from '../context';
import { Ionicons } from '@expo/vector-icons';

const API_URL = process.env.API_URL || "http://localhost:4000";

interface Order {
  id: string;
  tableNumber: number;
  customer: string;
  status: string;
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
}

const DEFAULT_IMAGE = "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=";

const fetchOrders = async ({ token }: { token?: string | null }): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/order`, {
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

export default function HomeScreen() {
  const { session, signOut } = useSession();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders({ token: session }),
  });

  const { data: productionOrders, isLoading: productionOrdersLoading } = useQuery({
    queryKey: ["productionOrders"],
    queryFn: () => fetchProductionOrders({ token: session }),
  });

  const handleCreateOrder = () => {
    router.push("/order");
  };

  if (ordersLoading || productionOrdersLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const ongoingOrders = orders?.filter(order => order.status === "OPENED") || [];
  const pendingProductionOrders = productionOrders?.filter(order =>
    order.status === "PENDING" || order.status === "IN_PROGRESS"
  ) || [];

  console.log({ ongoingOrders });
  console.log({ pendingProductionOrders });

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <XStack justifyContent="space-between" alignItems="center" paddingVertical="$4">
        <Text fontSize="$8" fontWeight="$16">Dashboard</Text>
        <Button onPress={signOut} theme="red">Sign Out</Button>
      </XStack>

      <Button
        onPress={handleCreateOrder}
        size="$5"
        theme="green"
        marginVertical="$4"
      >
        Create New Order
      </Button>

      <ScrollView>
        <Card bordered size="$4" marginBottom="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Ongoing Orders ({ongoingOrders.length})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            {ongoingOrders.map((order) => (
              <Card key={order.id} bordered size="$4" theme="dark">
                <Card.Header padded>
                  <XStack justifyContent="space-between" alignItems="center">
                    <XStack alignItems="center" gap="$2">
                      <Ionicons name="restaurant-outline" size={24} color="#666" />
                      <Text>Table {order.tableNumber} - <Text fontWeight="bold">#{order.id.slice(0, 8)}</Text></Text>
                    </XStack>
                    <Text>R$ {order.totalAmount || '0.00'}</Text>
                  </XStack>
                </Card.Header>
                <Card.Footer padded>
                  <XStack justifyContent="space-between" gap="$2">
                    <Text fontSize="$3" color="$gray11" fontWeight="bold">{order.customer}</Text>
                    <Text fontSize="$3" color="$gray11">
                      {new Date(order.openedAt).toLocaleTimeString()}
                    </Text>
                  </XStack>
                </Card.Footer>
              </Card>
            ))}
          </YStack>
        </Card>

        <Card bordered size="$4">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14">Production Orders ({pendingProductionOrders.length})</Text>
          </Card.Header>
          <Separator />
          <YStack padding="$2" gap="$2">
            {pendingProductionOrders.map((order) => (
              <Card key={order.id} bordered size="$4">
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
                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$3" color="$gray11">Order <Text fontWeight="bold">#{order.orderId.slice(0, 8)}</Text></Text>
                        <XStack
                          backgroundColor={order.type === "KITCHEN" ? "$orange4" : "$blue4"}
                          paddingHorizontal="$2"
                          paddingVertical="$1"
                          borderRadius="$4"
                        >
                          <Text
                            fontSize="$2"
                            color={order.type === "KITCHEN" ? "$orange10" : "$blue10"}
                          >
                            {order.type}
                          </Text>
                        </XStack>
                      </XStack>
                    </YStack>
                  </XStack>
                </Card.Header>
                <Card.Footer padded backgroundColor="$gray3">
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="$3" color="$gray11">Status: </Text>
                    <XStack
                      backgroundColor={
                        order.status === "CANCELLED" ? "$red4" :
                          order.status === "PENDING" ? "$yellow4" :
                            order.status === "IN_PROGRESS" ? "$blue4" : "$green4"
                      }
                      paddingHorizontal="$2"
                      paddingVertical="$1"
                      borderRadius="$4"
                    >
                      <Text
                        fontSize="$2"
                        color={
                          order.status === "CANCELLED" ? "$red10" :
                            order.status === "PENDING" ? "$yellow10" :
                              order.status === "IN_PROGRESS" ? "$blue10" : "$green10"
                        }
                      >
                        {order.status}
                      </Text>
                    </XStack>
                  </XStack>
                </Card.Footer>
              </Card>
            ))}
          </YStack>
        </Card>
      </ScrollView>
    </YStack>
  );
}