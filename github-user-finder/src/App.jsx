import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (username.trim()) {
      setSearchTerm(username.trim());
    }
  };

  return (
    <div className="app">
      <h1>GitHub user finder</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}><IoSearch /></button>
      </div>
      {searchTerm && <p>Searching for: {searchTerm}</p>}
    </div>
  );
}

export default App;
