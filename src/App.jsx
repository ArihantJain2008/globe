import { Routes, Route } from "react-router-dom";
import GlobeView from "./components/Globe";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobeView />} />
      <Route
        path="/country/:name"
        element={<CountryPage />}
      />
    </Routes>
  );
}

export default App;