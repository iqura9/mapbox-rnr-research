import { openDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const db = openDatabase("books.db");

const initializeDatabase = () => {
  db.transaction((tx) => {
    // Створення таблиці "books"
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY NOT NULL,
        author TEXT,
        title TEXT,
        year INTEGER,
        pages INTEGER,
        publisherAddress TEXT
      );`,
    );

    // Заповнення таблиці "books" даними
    tx.executeSql(
      `INSERT OR IGNORE INTO books (id, author, title, year, pages, publisherAddress) VALUES
        (1, 'Автор 1', 'Книга 1', 2005, 200, 'Адреса 1'),
        (2, 'Автор 2', 'Книга 2', 2012, 300, 'Адреса 2'),
        (3, 'Автор 3', 'Книга 3', 2018, 250, 'Адреса 3'),
        (4, 'Автор 4', 'Книга 4', 1999, 150, 'Адреса 4');
      `,
    );

    // Створення таблиці "contacts"
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY NOT NULL,
        surname TEXT,
        name TEXT
      );`,
    );

    // Заповнення таблиці "contacts" даними
    tx.executeSql(
      `INSERT OR IGNORE INTO contacts (id, surname, name) VALUES
        (1, 'Петренко', 'Іван'),
        (2, 'Сидоренко', 'Петро'),
        (3, 'Іванов', 'Олег'),
        (4, 'Коваленко', 'Микола');
      `,
    );
  });
};

const getOldBooks = (setBooks: (books: any[]) => void) => {
  const currentYear = new Date().getFullYear();
  const tenYearsAgo = currentYear - 10;

  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM books WHERE year < ?;`,
      [tenYearsAgo],
      (_, { rows }) => {
        setBooks(rows._array);
      },
      (_, error) => {
        console.error(error);
        return false;
      },
    );
  });
};

const getContactsEndingWithKo = (setContacts: (contacts: any[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM contacts WHERE surname LIKE ?;`,
      ["%ко"],
      (_, { rows }) => {
        setContacts(rows._array);
      },
      (_, error) => {
        console.error(error);
        return false;
      },
    );
  });
};

const getBooksCount = (setCount: (count: number) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT COUNT(*) as count FROM books;`,
      [],
      (_, { rows }) => {
        setCount(rows._array[0].count);
      },
      (_, error) => {
        console.error(error);
        return false;
      },
    );
  });
};

const App = () => {
  const [oldBooks, setOldBooks] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [booksCount, setBooksCount] = useState<number>(0);

  useEffect(() => {
    initializeDatabase();

    getBooksCount(setBooksCount);
    getOldBooks(setOldBooks);
    getContactsEndingWithKo(setFilteredContacts);
  }, []);

  // Підрахунок відсотка відібраних книг
  const percentage = booksCount ? ((oldBooks.length / booksCount) * 100).toFixed(2) : "0";

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2">Книги, вік яких понад 10 років:</Text>
      <FlatList
        data={oldBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text className="text-base">{item.title}</Text>}
      />
      <Text className="text-base mt-2">Відсоток відібраних книг: {percentage}%</Text>

      <Text className="text-xl font-bold mt-4 mb-2">Контакти з прізвищем, що закінчується на "ко":</Text>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-base">
            {item.surname} {item.name}
          </Text>
        )}
      />
    </View>
  );
};

export default App;
