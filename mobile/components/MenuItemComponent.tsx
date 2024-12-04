import { Image } from 'react-native';
import { Button, Text, XStack, YStack } from 'tamagui';
import { MenuItem as MenuItemType } from '../app/(tabs)/order';

const DEFAULT_IMAGE = "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=";

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, quantity, onAdd, onRemove }) => {
  return (
    <XStack
      padding="$4"
      borderBottomWidth={1}
      borderColor="$borderColor"
      justifyContent="space-between"
      alignItems="center"
      shadowColor="gray"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.2}
      shadowRadius={1}
    >
      <Image
        source={{ uri: item.imageUrl || DEFAULT_IMAGE }}
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
      />
      <YStack flex={1} gap="$2">
        <Text fontWeight="bold">{item.description}</Text>
        <Text fontWeight="200" fontSize="$4">R$ {item.price}</Text>
      </YStack>
      <XStack gap="$2" alignItems="center">
        <Button onPress={onRemove}>-</Button>
        <Text fontSize="$4">{quantity}</Text>
        <Button onPress={onAdd}>+</Button>
      </XStack>
    </XStack>
  );
};

export default MenuItemComponent; 