import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { ScrollView } from 'react-native';
import { Text, YStack, XStack, Card, Separator, Button } from 'tamagui';

interface SalesReportProps {
  date: string;
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
  itemsSold: {
    description: string;
    category: string;
    quantity: number;
    totalAmount: number;
  }[];
  handlePreviousDay: () => void;
  handleNextDay: () => void;
}

const DailySalesReport: React.FC<SalesReportProps> = ({
  date,
  totalOrders,
  totalAmount,
  averageOrderValue,
  itemsSold,
  handlePreviousDay,
  handleNextDay,
}) => {
  return (
    <ScrollView>
      <YStack padding="$4" gap="$2">
        <Text
          fontSize="$8"
          fontWeight="$16"
          textAlign="center"
          color="$gray12"
        >
          Relatório de Vendas
        </Text>

        <XStack padding={10} borderRadius={10} alignItems="center" justifyContent="center" gap={10}>
          <Button onPress={handlePreviousDay}>
            <ChevronLeft color="$gray11" />
          </Button>
          <Text
            fontSize="$4"
            fontWeight="$12"
            textAlign="center"
            color="$gray11"
          >
            {date}
          </Text>
          <Button onPress={handleNextDay}>
            <ChevronRight color="$gray11" />
          </Button>
        </XStack>

        <Card bordered size="$4" animation="bouncy">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14" color="$gray12">Resumo</Text>
          </Card.Header>
          <Separator />
          <Card.Footer padded>
            <YStack space="$3" width="100%">
              <XStack justifyContent="space-between">
                <Text color="$gray11">Total de Pedidos</Text>
                <Text fontWeight="$12" color="$gray12">{totalOrders}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text color="$gray11">Valor Total</Text>
                <Text fontWeight="$12" color="$gray12">
                  R$ {totalAmount ? Number(totalAmount).toFixed(2) : '0.00'}
                </Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text color="$gray11">Ticket Médio</Text>
                <Text fontWeight="$12" color="$gray12">
                  R$ {averageOrderValue ? Number(averageOrderValue).toFixed(2) : '0.00'}
                </Text>
              </XStack>
            </YStack>
          </Card.Footer>
        </Card>

        <Card bordered size="$4" animation="bouncy">
          <Card.Header padded>
            <Text fontSize="$6" fontWeight="$14" color="$gray12">Itens Vendidos</Text>
          </Card.Header>
          <Separator />
          <Card.Footer padded>
            <YStack space="$3" width="100%">
              {itemsSold.map((item, index) => (
                <Card
                  key={index}
                  bordered
                  size="$2"
                  backgroundColor="$gray2"
                  pressStyle={{ scale: 0.97 }}
                >
                  <Card.Header padded>
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack gap="$1">
                        <Text fontWeight="$12" color="$gray12">{item.description}</Text>
                        <Text fontSize="$3" color="$gray11" style={{ width: 'fit-content', borderRadius: 20, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, backgroundColor: item.category === 'FOOD' ? '#D73035' : '#4d39f', color: '#fff' }}>{item.category.toLocaleLowerCase()}</Text>
                      </YStack>
                    </XStack>
                  </Card.Header>
                  <Card.Footer padded backgroundColor="$gray3">
                    <Text fontSize="$3" color="$gray11">
                      Quantidade vendida: {item.quantity}
                    </Text>
                  </Card.Footer>
                </Card>
              ))}
            </YStack>
          </Card.Footer>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default DailySalesReport;