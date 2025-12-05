import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
