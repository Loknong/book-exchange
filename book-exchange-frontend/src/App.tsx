import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";

// Old Page
import AddressPage from "./pages/AddressPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Utils Routes
import ProtectedRoute from "./routes/ProtectedRoute";

// Main Layout
import MainLayout from "./components/layout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./components/Home/LandingPage";
import BookExplorePage from "./components/BookExplore/BookExplorePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactPage";

// Form
import ReactFormPage from "./pages/testing/ReactFormPage";
import RegularForm from "./react-form/regularRegister";
import RegularWithHook from "./react-form/RegularWithHook";
import ExchangeBookRegular from "./react-form/ExchangeBookRegular";
import ExchangeBookWithForm from "./react-form/ExchangeBookWithForm";

// User Accout
import AccountLayout from "./components/layout/account/AccountLayout";
import ProfileInfo from "./components/ProfileInfo";

// Mobile-specific routes
import SearchPage from "./pages/mobile/SearchPage";

// Testing Page
import BookExplorePage_2 from "./components/BookExplore2/BookExplorePage_2";
import ProductDetailPage_2 from "./pages/ProductDetailPage2";

function App() {
  const initializeUser = useUserStore((state) => state.initializeUser);
  const checkExpire = useUserStore((state) => state.checkExpire)
  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    checkExpire();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="explore" element={<BookExplorePage />} />
          <Route path="explore-open-library" element={<BookExplorePage_2 />} />
          <Route path="explore/product/:id" element={<ProductDetailPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="product/works/:id" element={<ProductDetailPage_2 />} />

          {/* Company Detail page */}
          <Route path="about" element={<AboutPage />}></Route>
          <Route path="contact" element={<ContactUsPage />}></Route>

          {/* User Account Page */}
          <Route path="account" element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }>
            <Route path="profile" element={<ProfileInfo />} />
          </Route>

          {/* Mobile-specific routes */}
          <Route path="search" element={<SearchPage />} />

          {/* practice form */}
          <Route path="form" element={<ReactFormPage />}>
            <Route path="regular" element={<RegularForm />} />
            <Route path="hook-form" element={<RegularWithHook />} />
            <Route path="exchange-regular" element={<ExchangeBookRegular />} />
            <Route
              path="exchange-hook-form"
              element={<ExchangeBookWithForm />}
            />
          </Route>
        </Route>

        {/* User auth routes˝ */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* keep for testign protect routes */}
        <Route path="/in" element={<MainLayout />}>
          <Route
            path="address"
            element={
              <ProtectedRoute>
                <AddressPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
