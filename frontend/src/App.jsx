import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CpuPage from "./pages/CpuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/cpu"
          element={<CpuPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;