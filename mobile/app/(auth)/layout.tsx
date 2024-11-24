import { Redirect, router, Stack } from 'expo-router';
import * as Linking from 'expo-linking';

import { useSession } from '../context';
import { Text } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
console.log({session});
  if(!session){
   return router.push("/login");
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}