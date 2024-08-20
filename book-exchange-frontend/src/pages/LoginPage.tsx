// import React from "react";
// import LoginForm from "../components/auth/LoginForm";

// const LoginPage = () => {
//   return (
//     <div className="w-full border-red-200 border-2 flex flex-row justify-center">
//       <LoginForm />
//     </div>
//   );
// };

// export default LoginPage;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../assets/logo.svg";
import Footer from "../components/layout/base/Footer";
import { useNavigate } from "react-router-dom";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  remember: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className=" container py-16">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt=""
          className="w-48 mx-auto py-20 cursor-pointer"
        />

        <div className="max-w-md mx-auto border border-gray-200 shadow-lg px-8 py-7 rounded-xl overflow-hidden">
          <h2 className="text-3xl uppercase font-medium mb-1">Sign In</h2>
          <p className="text-gray-600 text-sm mb-6">
            Login if you are a returning customer
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    {...register("remember")}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`block w-full text-center border py-2 rounded text-white uppercase font-medium transition ${
                    isValid
                      ? "bg-primary hover:bg-transparent hover:text-primary  border-primary "
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          {/* Login with */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or Login With
            </div>
            <div className="absolute border-gray-200 border w-full top-3"></div>
          </div>
          <div className="flex mt-4 gap-4">
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-medium text-sm hover:bg-blue-700"
            >
              Facebook
            </a>
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-medium text-sm hover:bg-yellow-500"
            >
              Google
            </a>
          </div>

          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?
            <a href="#" className="text-primary">
              Register now
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
