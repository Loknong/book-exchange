import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AuthFormHandler } from "../components/layout/AuthFormHandler";
import { isMockMode } from "../utils/mode";
import { mockUsers } from "../utils/mock/UserMockData";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
  remember: z.boolean(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const checkExpire = useUserStore((state) => state.checkExpire);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    checkExpire();
  }, [])

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, []);

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data", data);

    if (isMockMode()) {
      const user = mockUsers.find(user => user.email === data.email && user.password === data.password);
      if (user) {
        const authToken = JSON.stringify(user); // Mock token
        const expirationTime = new Date().getTime() + 30 * 60 * 1000;
        console.log("Mock token:", authToken);
        console.log("Expiration time:", expirationTime);



        setUser(user.id, user.username, user.role, data.remember, authToken, expirationTime);

        navigate("/"); // Redirect to the main page or any protected route
      } else {
        console.error("Invalid credentials");
        setError("root", { message: "Invalid credentials" });
      }
    } else {
      // Here would be your API call in production mode
      console.log("API login logic here", data);
    }
  };

  return (
    <AuthFormHandler>
      <h2 className="text-3xl uppercase font-medium mb-1">Sign In</h2>
      <p className="text-gray-600 text-sm mb-6">Login if you are a returning customer</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">Email Address</label>
            <input
              type="email"
              id="email"
              className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${errors.email ? "border-red-500" : ""
                }`}
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
            <input
              type="password"
              id="password"
              className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${errors.password ? "border-red-500" : ""
                }`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="text-primary focus:ring-0 rounded-sm cursor-pointer" {...register("remember")} />
              <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">Remember me</label>
            </div>
            <a href="#" className="text-primary hover:underline">Forgot Password?</a>
          </div>

          <div className="mt-4">
            <button type="submit" disabled={!isValid} className={`block w-full text-center border py-2 rounded text-white uppercase font-medium transition ${isValid ? "bg-primary hover:bg-transparent hover:text-primary  border-primary " : "bg-gray-300 cursor-not-allowed"
              }`}>
              Login
            </button>
          </div>
          {errors.root && <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>}
        </div>
      </form>

      <div className="mt-6 flex justify-center relative">
        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or Login With</div>
        <div className="absolute border-gray-200 border w-full top-3"></div>
      </div>
      <div className="flex mt-4 gap-4">
        <a href="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-medium text-sm hover:bg-blue-700">Facebook</a>
        <a href="#" className="w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-medium text-sm hover:bg-yellow-500">Google</a>
      </div>

      <p className="mt-4 text-gray-600 text-center">Don't have an account?<span onClick={() => navigate("/register")} className="text-primary ml-2">Register now</span></p>
    </AuthFormHandler>
  );
}

export default LoginPage;
