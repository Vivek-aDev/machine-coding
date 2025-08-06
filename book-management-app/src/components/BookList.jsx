import React from "react";
import BookItem from "./BookItem";

const BookList = ({ books, onToggleRead, onDelete }) => {
    if(books.length === 0) {
        return <p>No Books to Display...</p>
    }
  return (
    <section className="book-list">
      <ul>
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onToggleRead={onToggleRead}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
