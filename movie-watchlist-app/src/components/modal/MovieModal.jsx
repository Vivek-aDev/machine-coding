import React from "react";
import './MovieModal.css'

const MovieModal = ({ movie, onClose }) => {
  const { title, vote_average, release_date, overview } = movie;
  return (
    <div className="modal-overlay" onClick={onclose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ⨯
        </button>
        <h2>{title}</h2>
        <p>
          <strong>Rating:</strong>
          {vote_average}
        </p>
        <p>
          <strong>Release Date: </strong>
          {release_date}
        </p>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
