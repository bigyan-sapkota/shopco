import { Route, Routes } from "react-router-dom";
import { HomePage, ProductsPage } from "./pages";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}
