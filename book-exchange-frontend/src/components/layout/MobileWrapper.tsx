import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function MobileWrapper({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Trigger the slide-in effect after the component mounts
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Trigger the slide-out effect before navigating back
    setIsVisible(false);
    setTimeout(() => {
      navigate("/account");
    }, 300); // Match this duration to your transition duration
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full min-h-screen bg-white z-50 pt-2 transition-transform duration-300 divide-y-2  divide-gray-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div onClick={handleClose}>x</div>
      <div className="flex w-full items-center flex-col divide-y divide-gray-300 gap-3">
        {children}
      </div>
    </div>
  );
}

export default MobileWrapper;
