import { useEffect, useState } from "react";
import "./App.css";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import FilterDropdown from "./components/FilterDropdown";

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleAddBook = () => {
    if (title.trim() === "" || author.trim() === "") return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      isRead: false,
    };

    setBooks((prevState) => [...prevState, newBook]);

    console.log(books);
    setTitle("");
    setAuthor("");
  };

  const handleToggleRead = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, isRead: !book.isRead } : book
    );
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const filteredbooks = books.filter((book) => {
    if (filter === "read") return book.isRead;
    if (filter === "unread") return !book.isRead;
    return true;
  });

  return (
    <div
      style={{
        border: "2px solid lightblue",
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h1>📚 Book Management App</h1>

      <AddBookForm
        title={title}
        author={author}
        setTitle={setTitle}
        setAuthor={setAuthor}
        onAdd={handleAddBook}
      />

      {/* Filter Dropdown */}
      <FilterDropdown filter={filter} setFilter={setFilter} />

      {/* Book List */}
      <section style={{ marginTop: "1rem" }}>
        <h2>Book List</h2>
        <BookList
          books={filteredbooks}
          onToggleRead={handleToggleRead}
          onDelete={handleDeleteBook}
        />
      </section>
    </div>
  );
}

export default App;
