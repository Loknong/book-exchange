import "./App.css";
import { Routes, Route } from "react-router-dom";
// import LoginTest from "./components/LoginTest";
import SignupForm from "./components/auth/SignupForm";
import UserInventory from "./components/user/UserInventory";
import AddBookForm from "./components/user/AddBookForm";
import TransactionHistory from "./components/user/TransactionHistory";
import BookShelf from "./pages/BookShelf";
import UserPage from "./pages/UserPage";
// import ComponentTestPage from "./pages/ComponentTestPage";

// import BearBox from "./zustand-basic/components/BearBox";
import AddressPage from "./pages/AddressPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";
import BaseLayout from "./components/layout/BaseLayout";

import CommonLayout from "./components/layout/common/CommonLayout";

import MainLayout2 from "./components/layout/MainLayout2";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./components/Home/LandingPage";
import BookExplorePage from "./components/BookExplore/BookExplorePage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactPage";

import ProductDetailPage from "./pages/ProductDetailPage";

// Form
import ReactFormPage from "./pages/testing/ReactFormPage";
import RegularForm from "./react-form/regularRegister";
import RegularWithHook from "./react-form/RegularWithHook";
import ExchangeBookRegular from "./react-form/ExchangeBookRegular";
import ExchangeBookWithForm from "./react-form/ExchangeBookWithForm";

// Mobile-specific routes
import SearchPage from "./pages/mobile/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout2 />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="explore" element={<BookExplorePage />} />
          <Route path="explore/product/:id" element={<ProductDetailPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />}></Route>
          <Route path="contact" element={<ContactUsPage />}></Route>

          {/* Mobile-specific routes */}
          <Route path="search" element={<SearchPage />} />


          {/* practice form */}
          <Route path="form" element={<ReactFormPage />} >
            <Route path="regular" element={<RegularForm />} />
            <Route path="hook-form" element={<RegularWithHook />} />
            <Route path="exchange-regular" element={<ExchangeBookRegular />} />
            <Route path="exchange-hook-form" element={<ExchangeBookWithForm />} />

          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/test" element={<CommonLayout />}></Route>


        <Route path="/auth" element={<AuthLayout />}>

          <Route path="signup" element={<SignupForm />} />

        </Route>

        <Route path="/in" element={<BaseLayout />}>
          <Route
            path="address"
            element={
              <ProtectedRoute>
                <AddressPage />
              </ProtectedRoute>
              // <AddressPage />
            }
          />
          <Route path="bookshelf" element={<BookShelf />} />
        </Route>

        <Route path="/user" element={<UserPage />}>
          <Route path="inventory" element={<UserInventory />} />
          <Route path="add-book" element={<AddBookForm />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
        {/* <Route path="/component-test" element={<ComponentTestPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
