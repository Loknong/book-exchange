import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Footer from "./base/Footer";

type HandlerProp = {
  children: ReactNode;
};

export const AuthFormHandler = ({ children }: HandlerProp) => {
  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
  }, []);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <div className=" container py-0">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt=""
          className="w-48 mx-auto py-20 cursor-pointer"
        />

        <div className="max-w-md mx-auto border border-gray-200 shadow-lg px-8 py-7 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};
