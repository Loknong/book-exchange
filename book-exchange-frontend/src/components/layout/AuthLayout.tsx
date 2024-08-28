// import { Outlet } from "react-router-dom";

// const AuthLayout = () => {
//   return (
//     <div className="flex flex-col justify-between w-screen h-screen">
//       <header className="text-center auth-header px-10 py-4  bg-gray-300 w-[100%] justify-between flex flex-row items-center shadow-md">
//         Auth Header
//       </header>
//       <main className="auth-main flex flex-row justify-center w-full  p-[36px] border">
//         <Outlet />
//       </main>
//       <footer className=" text-center auth-footer p-4 bg-gray-300 w-[100%]">
//         Auth Footer
//       </footer>
//     </div>
//   );
// };

// export default AuthLayout;
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
