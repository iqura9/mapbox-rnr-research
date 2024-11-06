import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getBooksCount, getContactsEndingWithKo, getOldBooks, initializeDatabase } from "~/components/database";

const HomeScreen = () => {
  const [oldBooks, setOldBooks] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [booksCount, setBooksCount] = useState<number>(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getBooksCount(setBooksCount);
      getOldBooks(setOldBooks);
      getContactsEndingWithKo(setFilteredContacts);
    }
  }, [isFocused]);

  // Підрахунок відсотка відібраних книг
  const percentage = booksCount ? ((oldBooks.length / booksCount) * 100).toFixed(2) : "0";

  return (
    <View className="flex-1 p-4 bg-white">
      <TouchableOpacity className="bg-blue-500 p-2 rounded mb-4" onPress={() => router.push("/CreateBookScreen")}>
        <Text className="text-white text-center">Додати нову книгу</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-blue-500 p-2 rounded mb-4" onPress={() => router.push("/ContactsScreen")}>
        <Text className="text-white text-center">Контакти</Text>
      </TouchableOpacity>
      <Text className="text-xl font-bold mb-2">Книги, вік яких понад 10 років:</Text>
      <FlatList
        data={oldBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text className="text-base">{item.title}</Text>}
      />
      <Text className="text-base mt-2">Відсоток відібраних книг: {percentage}%</Text>
    </View>
  );
};

export default HomeScreen;
