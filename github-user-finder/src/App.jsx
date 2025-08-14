import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) return;

    setSearchTerm(username.trim());
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
        <button onClick={handleSearch}>
          <IoSearch />
        </button>
      </div>

      {/* loading/Error state handle */}
      {loading && <p>Searching for: {searchTerm}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div className="card">
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.name || "No name"}</h2>
          <p>{userData.bio || "No bio available"}</p>
          <div className="stats">
            <span>Repos: {userData.public_repos}</span>
            <span>Followers: {userData.followers}</span>
            <span>Followings: {userData.following}</span>
          </div>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
