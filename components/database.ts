import { openDatabase } from "expo-sqlite";

const db = openDatabase("books.db");

export const initializeDatabase = () => {
  db.transaction((tx) => {
    // Створення таблиці "books"
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        title TEXT,
        year INTEGER,
        pages INTEGER,
        publisherAddress TEXT
      );`,
    );

    // Заповнення таблиці "books" даними (якщо потрібно)
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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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

export const getOldBooks = (setBooks: (books: any[]) => void) => {
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

export const getContactsEndingWithKo = (setContacts: (contacts: any[]) => void) => {
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

export const getBooksCount = (setCount: (count: number) => void) => {
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

export const addBookToDatabase = (
  author: string,
  title: string,
  year: number,
  pages: number,
  publisherAddress: string,
  onSuccess: () => void,
  onError: (error: any) => void,
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO books (author, title, year, pages, publisherAddress) VALUES (?, ?, ?, ?, ?);`,
      [author, title, year, pages, publisherAddress],
      (_, result) => {
        onSuccess();
      },
      (_, error) => {
        console.error(error);
        onError(error);
        return false;
      },
    );
  });
};
