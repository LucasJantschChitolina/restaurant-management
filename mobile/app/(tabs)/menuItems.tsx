import { useState } from "react";
import { Button, Input, Text, YStack, ScrollView, Image, ToggleGroup, styled, Spinner, Card, XStack, Form } from "tamagui";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "../context";

const API_URL = process.env.API_URL || "http://localhost:4000";

const fetchMenuItems = async ({ token }: { token?: string | null }) => {
  const response = await fetch(`${API_URL}/menu-item`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const createMenuItem = async (data: CreateMenuItem, token?: string | null): Promise<MenuItem> => {
  const response = await fetch(`${API_URL}/menu-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    window.alert(error.error);
  }
  return response.json();
};

const updateMenuItem = async (id: string, data: MenuItem, token?: string | null): Promise<MenuItem> => {
  const response = await fetch(`${API_URL}/menu-item/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    window.alert(error.error);
  }

  return response.json();
};

const deleteMenuItem = async (id: string, token?: string | null): Promise<void> => {
  const response = await fetch(`${API_URL}/menu-item/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    window.alert(error.error);
  }
};

interface MenuItem {
  id: string;
  description: string;
  price: number;
  category: "FOOD" | "DRINK";
  imageUrl: string;
}

type CreateMenuItem = Omit<MenuItem, 'id'>;

const MenuItemCRUD = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const { data: menuItems = [], isLoading, isError } = useQuery({ queryKey: ["menuItems"], queryFn: () => fetchMenuItems({ token: session }) });

  const createMutation = useMutation({
    mutationFn: (data: CreateMenuItem) => createMenuItem(data, session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuItem }) => updateMenuItem(id, data, session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMenuItem(id, session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState<"FOOD" | "DRINK">("FOOD");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = () => {
    if (editingItemId) {
      updateMutation.mutate({ id: editingItemId, data: { description, price: Number(price), category, imageUrl, id: editingItemId } });
    } else {
      createMutation.mutate({ description, price: Number(price), category, imageUrl });
    }
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setEditingItemId(item.id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const resetForm = () => {
    setDescription("");
    setPrice("");
    setCategory("FOOD");
    setImageUrl("");
    setEditingItemId(null);
  };

  if (isLoading) return (
    <YStack flex={1} justifyContent="center" alignItems="center"><Spinner size="large" /></YStack>
  );

  if (isError) return (
    <YStack flex={1} justifyContent="center" alignItems="center"><Text>Error loading menu items</Text></YStack>
  );

  return (
    <YStack padding="$4" flex={1} gap="$2">
      <Text fontSize="$8" fontWeight="$16" paddingVertical="$4">Itens do cardápio</Text>

      <Form gap="$2">
        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          placeholder="Preço"
          value={price.toString()}
          onChangeText={text => setPrice(Number(text))}
          keyboardType="numeric"
        />
        <Input
          placeholder="Imagem"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <ToggleGroup
          orientation="horizontal"
          type="single"
          size="$3"
          disableDeactivation={true}
          value={category}
        >
          <ToggleGroup.Item value="FOOD" aria-label="Comida" onPress={() => setCategory("FOOD")} active={category === "FOOD"}>
            <Text>Comida</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item value="DRINK" aria-label="Bebida" onPress={() => setCategory("DRINK")} active={category === "DRINK"}>
            <Text>Bebida</Text>
          </ToggleGroup.Item>
        </ToggleGroup>
        <Button backgroundColor="$red9" color="$red1" hoverStyle={{ backgroundColor: "$red10" }} onPress={handleSubmit}>
          {editingItemId ? "Atualizar Item" : "Adicionar Item"}
        </Button>
      </Form>

      <ScrollView marginTop="$4">
        {menuItems.map((item: MenuItem) => (
          <Card key={item.id} padding="$4" gap="$4" marginBottom="$4" >
            <XStack>
              <Image
                source={{ uri: item.imageUrl || '' }}
                style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
              />
              <YStack>
                <Text>{item.description} - R$ {item.price}</Text>
                <Text fontSize="$4" color="$gray11">{item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()}</Text>
              </YStack>
            </XStack>

            <YStack justifyContent="flex-end" gap="$2">
              <Button onPress={() => handleEdit(item)}>Editar</Button>
              <Button onPress={() => handleDelete(item.id)}>Inativar</Button>
            </YStack>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};

export default MenuItemCRUD;