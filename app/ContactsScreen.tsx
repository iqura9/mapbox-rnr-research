// ContactsScreen.tsx
import { useIsFocused } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [allContacts, setAllContacts] = useState<any[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getContactsFromDevice();
    }
  }, [isFocused]);

  const getContactsFromDevice = async () => {
    setIsLoadingContacts(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name],
        });

        if (data.length > 0) {
          const filtered = data.filter((contact) => {
            return (
              contact.name?.endsWith("ко") ||
              contact.lastName?.endsWith("ко") ||
              contact.name?.endsWith("ko") ||
              contact.lastName?.endsWith("ko")
            );
          });
          setContacts(filtered);
          setAllContacts(data);
        }
      } else {
        Alert.alert("Доступ заборонено", "Додаток не має доступу до контактів");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Помилка", "Не вдалося отримати контакти");
    }
    setIsLoadingContacts(false);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2">Контакти з прізвищем, що закінчується на "ко":</Text>
      {isLoadingContacts ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text className="text-base mt-4">{item.name}</Text>}
            className="h-[200px]"
          />
          <Text className="text-xl font-bold mb-2">Усі контакти:</Text>

          <FlatList
            data={allContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text className="text-base mt-4">{item.name}</Text>}
          />
        </>
      )}
    </View>
  );
};

export default ContactsScreen;
