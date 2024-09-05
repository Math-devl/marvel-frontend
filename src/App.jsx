import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//compoennts
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import ComicsCharId from "./pages/ComicsCharId";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";

function App() {
  //states communs à plusieurs routes
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters search={search} setSearch={setSearch} />}
        />
        {/*  <Route path="/comic/:comicId" element={<Comic />} /> */}
        {/* //route pour aller vers les comics liés au character */}
        <Route
          path="/comics"
          element={<Comics search={search} setSearch={setSearch} />}
        />
        <Route path="/comics/:characterId" element={<ComicsCharId />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
