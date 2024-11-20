import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'react-native';
import { H1, YStack, Paragraph, ListItem } from 'tamagui';

async function fetchFacebookRepos() {
  const response = await fetch('https://api.github.com/orgs/facebook/repos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function FacebookRepos() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['facebookRepos'],
    queryFn: fetchFacebookRepos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{
            height: 178,
            width: 290,
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      }>

      <YStack padding="$4" space="$4">
        <H1>Facebook Organization Repositories</H1>
        <YStack gap="$2">
          {data.map((repo: any) => (
            <ListItem key={repo.id}>
              <Paragraph size="$2" theme="alt2">
                {repo.name}
              </Paragraph>
            </ListItem>
          ))}
        </YStack>
      </YStack>
    </ParallaxScrollView>
  );
}

export default FacebookRepos;