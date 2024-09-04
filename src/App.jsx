import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//compoennts
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        {/* //route pour aller vers les comics liés au character */}
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
