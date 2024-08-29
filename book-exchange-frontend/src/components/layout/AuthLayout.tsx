import { Outlet } from "react-router-dom";
import Footer from "./base/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />

      <Footer />
    </div>
  );
};

export default AuthLayout;
