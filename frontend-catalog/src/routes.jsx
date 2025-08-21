import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminCatalog from "./components/Admin/AdminCatalog";
import App from "./App";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminCatalog />} />
        <Route path="/catalog" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
