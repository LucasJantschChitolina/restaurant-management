import { StyleSheet, Platform, Image } from 'react-native';
import { Button, XStack, YStack, H1, Text, Separator, Card, Paragraph, Input } from 'tamagui';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <YStack padding="$4" space="$4">
        <H1>Tamagui UI Showcase</H1>
        <Text theme="alt1">Welcome to our Tamagui implementation!</Text>

   
        <Card bordered padding="$4" space="$3">
          <Text theme="alt2">Buttons</Text>
          <Separator />
          <XStack space="$2">
            <Button>Default</Button>
            <Button theme="alt1">Alt Theme</Button>
            <Button variant="outlined">Outlined</Button>
          </XStack>
        </Card>

        <Card bordered padding="$4" space="$3">
          <Text theme="alt2">Input Fields</Text>
          <Separator />
          <YStack space="$2">
            <Input placeholder="Default input" />
            <Input
              theme="alt1"
              placeholder="Themed input"
              borderWidth={2}
            />
          </YStack>
        </Card>

        <Card bordered padding="$4" elevate size="$4">
          <Card.Header>
            <H1>Card Title</H1>
          </Card.Header>
          <Paragraph size="$2" theme="alt2">
            This is a card component with header and content.
            Cards are useful for grouping related information.
          </Paragraph>
          <XStack marginTop="$2">
            <Button size="$3" theme="alt2">Learn More</Button>
          </XStack>
        </Card>

        <Card bordered padding="$4" space="$3">
          <Text theme="alt2">Layout Examples</Text>
          <Separator />
          <XStack space="$2" flexWrap="wrap">
            <YStack
              backgroundColor="$background"
              borderRadius="$4"
              padding="$2"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Text>YStack</Text>
            </YStack>
            <XStack
              backgroundColor="$background"
              borderRadius="$4"
              padding="$2"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Text>XStack</Text>
            </XStack>
          </XStack>
        </Card>

        <Card bordered padding="$4">
          <Text theme="alt2">Platform: {Platform.OS}</Text>
          <Paragraph size="$2">
            Press {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })} for dev menu
          </Paragraph>
        </Card>
      </YStack>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});