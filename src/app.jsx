import { Route, Routes } from "react-router-dom";
import { HomePage, ProductsPage } from "./pages";
import DashboardHomePage from "./pages/dashboard/home-page";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/dashboard" element={<DashboardHomePage />} />
      </Routes>
      <Footer />
    </>
  );
}
