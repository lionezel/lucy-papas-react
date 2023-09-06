import { Route, Routes } from "react-router";
import { Ordenes } from "./pages/ordenes/ordenes";
import { Menu } from "./pages/menu/menu";
import { NuevoPlatillo } from "./pages/nuevoPlatillo";
import { Sidebar } from "./shared/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Ordenes />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/nuevo-platillo" element={<NuevoPlatillo />} />
      </Routes>
    </div>
  );
}

export default App;
