import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { HomePage, LoginPage, ProductsPage, RegisterPage } from "./pages";
import DashboardHomePage from "./pages/dashboard/home-page";

import ProductDetailsPage from "./pages/product-details-page";
import DashboardLayout from "./components/dashboard/dashboard-layout";
import AddProductPage from "./pages/dashboard/products/add-product-page";
import UpdateProductPage from "./pages/dashboard/products/update-product-page";
import DashboardProductPage from "./pages/dashboard/products/product-page";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="products" element={<DashboardProductPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/:id" element={<UpdateProductPage />} />
        </Route>

        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
      {!isDashboard && <Footer />}
    </>
  );
}
