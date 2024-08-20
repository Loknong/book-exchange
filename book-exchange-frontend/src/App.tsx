import "./App.css";
import { Routes, Route } from "react-router-dom";
// import LoginTest from "./components/LoginTest";
import SignupForm from "./components/auth/SignupForm";
import UserInventory from "./components/user/UserInventory";
import AddBookForm from "./components/user/AddBookForm";
import TransactionHistory from "./components/user/TransactionHistory";
import BookShelf from "./pages/BookShelf";
import UserPage from "./pages/UserPage";
import ComponentTestPage from "./pages/ComponentTestPage";

// import BearBox from "./zustand-basic/components/BearBox";
import AddressPage from "./pages/AddressPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";
import BaseLayout from "./components/layout/BaseLayout";

import CommonLayout from "./components/layout/common/CommonLayout";

import MainLayout2 from "./components/layout/MainLayout2";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./components/Home/LandingPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout2 />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/test" element={<CommonLayout />}></Route>
        <Route path="login" element={<LoginPage />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
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
        <Route path="/component-test" element={<ComponentTestPage />} />
      </Routes>
    </>
  );
}

export default App;
