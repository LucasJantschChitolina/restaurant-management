import { Button, Text, XStack, YStack } from 'tamagui';
import { MenuItem as MenuItemType } from '../app/(tabs)/order';

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