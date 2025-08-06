import React from "react";
import BookItem from "./BookItem";

const BookList = ({ books, onToggleRead, onDelete }) => {
  return (
    <>
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
    </>
  );
};

export default BookList;
