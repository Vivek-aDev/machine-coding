import { useEffect, useState } from "react";
import "./App.css";

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

      {/* Add book form */}
      <section>
        <h2>Add a new Book</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Enter Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="submit-button" onClick={handleAddBook}>
          Submit
        </button>
      </section>

      {/* Filter Buttons */}
      <section
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {/* filter buttons goes here */}
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="read">read</option>
          <option value="unread">unread</option>
        </select>
      </section>

      {/* Book List */}
      <section style={{ marginTop: "1rem" }}>
        <h2>Book List</h2>
        {filteredbooks.length === 0 ? (
          <p>No Books added yet...</p>
        ) : (
          <ul>
            {filteredbooks.map(({ id, title, author, isRead }) => (
              <li
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <strong>{title}</strong> by {author} -{" "}
                  {isRead ? "✅ Read" : "❌ Unread"}
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={() => handleToggleRead(id)}>
                    {!isRead ? "Read 👍🏻" : "unread 👎🏻"}
                  </button>
                  <button onClick={() => handleDeleteBook(id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
