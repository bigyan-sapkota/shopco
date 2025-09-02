import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { HomePage, LoginPage, ProductsPage, RegisterPage } from "./pages";
import DashboardHomePage from "./pages/dashboard/home-page";
import ProductDetailsPage from "./pages/product-details-page";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/dashboard" element={<DashboardHomePage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
      {!isDashboard && <Footer />}
    </>
  );
}
