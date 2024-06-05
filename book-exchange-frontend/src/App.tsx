import "./App.css";
import { Routes, Route } from "react-router-dom";
// import LoginTest from "./components/LoginTest";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import UserInventory from "./components/user/UserInventory";
import AddBookForm from "./components/user/AddBookForm";
import TransactionHistory from "./components/user/TransactionHistory";
import BookShelf from "./pages/BookShelf";
import UserPage from "./pages/UserPage";

// import BearBox from "./zustand-basic/components/BearBox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/bookshelf" element={<BookShelf />} />
        <Route path="/user" element={<UserPage />}>
          <Route path="inventory" element={<UserInventory />} />
          <Route path="add-book" element={<AddBookForm />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
