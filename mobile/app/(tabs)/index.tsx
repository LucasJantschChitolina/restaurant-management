import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View, YStack } from 'tamagui';
import { useSession } from '../context';

export default function PageOneScreen() {
  const { signOut } = useSession();

  const handleCreateOrder = () => {
    // @ts-ignore
    router.push("/order")
  };

  return (
    <YStack
      flex={1}
      padding="$4"
      backgroundColor="$background"
    >
      <View w="$10">
        <Button onPress={handleCreateOrder}>
          <Text>Create Order</Text>
        </Button>
        <Button onPress={signOut}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </YStack>
  );
}