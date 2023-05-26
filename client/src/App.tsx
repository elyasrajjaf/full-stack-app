import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import CreateMeuble from "./pages/createMeuble";
import ModifierMeuble from "./pages/modifierMeuble";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-meuble" element={<CreateMeuble />} />
        <Route path="/modifier-meuble/:id" element={<ModifierMeuble />} />
      </Routes>
    </Router>
  );
}

export default App;