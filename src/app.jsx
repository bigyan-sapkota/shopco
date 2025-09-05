import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { HomePage, LoginPage, ProductsPage, RegisterPage } from "./pages";
import DashboardHomePage from "./pages/dashboard/home-page";

import DashboardLayout from "./components/dashboard/dashboard-layout";
import DashboardProductPage from "./pages/dashboard/products/product-page";
import NotFoundPage from "./pages/not-found-page";
import ProductDetailsPage from "./pages/product-details-page";
import ProtectedRoute from "./providers/protected-route-provider";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="products" element={<DashboardProductPage />} />
        </Route>

        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      {!isDashboard && <Footer />}
    </>
  );
}
