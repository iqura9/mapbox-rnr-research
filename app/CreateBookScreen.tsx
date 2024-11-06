import { router } from "expo-router";
import { openDatabase } from "expo-sqlite";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const db = openDatabase("books.db");

const CreateBookScreen = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [publisherAddress, setPublisherAddress] = useState("");

  const addBook = () => {
    if (!author || !title || !year || !pages || !publisherAddress) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO books (author, title, year, pages, publisherAddress) VALUES (?, ?, ?, ?, ?);`,
        [author, title, parseInt(year), parseInt(pages), publisherAddress],
        (_, result) => {
          Alert.alert("Успіх", "Книгу додано успішно");
          router.back();
        },
        (_, error) => {
          console.error(error);
          Alert.alert("Помилка", "Не вдалося додати книгу");
          return false;
        },
      );
    });
  };

  return (
    <View className="flex-1 p-4 bg-red-200">
      <Text className="text-lg font-bold mb-2">Додати нову книгу</Text>
      <TextInput
        className="border p-2 mb-2"
        placeholder="Автор"
        value={author}
        onChangeText={setAuthor}
        placeholderTextColor="#333"
      />
      <TextInput
        className="border p-2 mb-2"
        placeholder="Назва"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#333"
      />
      <TextInput
        className="border p-2 mb-2"
        placeholder="Рік видання"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
        placeholderTextColor="#333"
      />
      <TextInput
        className="border p-2 mb-2"
        placeholder="Кількість сторінок"
        keyboardType="numeric"
        value={pages}
        onChangeText={setPages}
        placeholderTextColor="#333"
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Адреса видавництва"
        value={publisherAddress}
        onChangeText={setPublisherAddress}
        placeholderTextColor="#333"
      />
      <TouchableOpacity className="bg-green-500 p-2 rounded" onPress={addBook}>
        <Text className="text-white text-center">Додати книгу</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBookScreen;
