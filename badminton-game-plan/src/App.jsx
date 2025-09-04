import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Plan from "./pages/Plan";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup/:mode" element={<Setup />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </>
  );
}

export default App;
