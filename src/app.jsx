import { Route, Routes } from "react-router-dom";
import { HomePage, ProductsPage } from "./pages";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
