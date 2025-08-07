import React from "react";
import "./MovieModal.css";
import { useState } from "react";
import { useEffect } from "react";
import { fetchTrailer } from "../../utils/api/trailer";

const MovieModal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const { id, title, vote_average, release_date, overview } = movie;

  useEffect(() => {
    async function loadTrailer() {
      const data = await fetchTrailer(id);

      const trailer = data.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }
    loadTrailer();
  }, [id]);

  return (
    <div className="modal-overlay" onClick={onclose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          close
        </button>
        {trailerKey ? (
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        ) : (
          <p>No trailer available.</p>
        )}
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
