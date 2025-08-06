import React from "react";

const AddBookForm = ({title, author, setTitle, setAuthor, onAdd}) => {
  return (
    <>
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
        <button className="submit-button" onClick={onAdd}>
          Add Book
        </button>
      </section>
    </>
  );
};

export default AddBookForm;
