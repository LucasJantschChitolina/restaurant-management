import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { useSession } from '../context';
import DailySalesReport from '@/components/DailySalesReport';

const fetchDailySalesReport = async ({ token, date }: { token?: string | null; date: string }) => {
  const response = await fetch(
    `http://localhost:4000/reports/daily-sales?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json();
};

export default function ReportsScreen() {
  const { session } = useSession();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };


  const { data: report, isLoading, error } = useQuery({
    queryKey: ['dailySalesReport', selectedDate],
    queryFn: () => fetchDailySalesReport({ token: session, date: selectedDate }),
  });

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Error loading report</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1}>
      {report && <DailySalesReport
        {...report}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
      />}
    </YStack>
  );
} 