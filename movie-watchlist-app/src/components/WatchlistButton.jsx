import React from "react";

const WatchlistButton = ({ isInWatchlist, toggleWatchlist }) => {
  return (
    <button onClick={toggleWatchlist} className="watchlist-btn">
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist ⭐️"}
    </button>
  );
};

export default WatchlistButton;
