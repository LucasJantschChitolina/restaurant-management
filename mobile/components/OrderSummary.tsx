import React from 'react';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import { OrderItem } from '../app/(tabs)/order';

interface OrderSummaryProps {
  orderItems: { [key: string]: OrderItem };
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, totalAmount, onConfirm, onCancel }) => {
  return (
    <YStack padding="$4" flex={1} gap="$4">
      <Text fontSize="$8" fontWeight="$16">Resumo comanda</Text>
      <Text>Total: ${totalAmount.toFixed(2)}</Text>
      <ScrollView>
        {Object.values(orderItems).map(({ item, quantity }) => (
          <XStack key={item.id} padding="$4" borderBottomWidth={1} borderColor="$borderColor" gap="$2" justifyContent="space-between">
            <YStack gap="$2">
              <Text fontSize="$4" fontWeight="$14">{item.description}</Text>
              <Text fontSize="$3" fontWeight="$4">R$ {item.price}</Text>
            </YStack>
            <Text fontSize="$3" fontWeight="$4">Qtd: {quantity}</Text>
          </XStack>
        ))}
      </ScrollView>
      <XStack padding="$4" gap="$4">
        <Button flex={1} onPress={onCancel}>Voltar</Button>
        <Button
          flex={1}
          backgroundColor="$green10"
          color="white"
          onPress={onConfirm}
        >
          {"Confirmar Pedido"}
        </Button>
      </XStack>
    </YStack>
  );
};

export default OrderSummary; 