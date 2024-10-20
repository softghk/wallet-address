import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Wallet } from "./pages/Wallet";

function App() {
  return (
    <div className="w-full flex items-center justify-center px-10 max-w-[1200px] mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
