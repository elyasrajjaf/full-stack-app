import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import CreateMeuble from "./pages/createMeuble";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-meuble" element={<CreateMeuble />} />
      </Routes>
    </Router>
  );
}

export default App;