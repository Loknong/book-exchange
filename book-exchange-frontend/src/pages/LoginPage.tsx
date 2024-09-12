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
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, setError } = useForm<LoginFormInputs>({
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

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login Data", data);

    if (isMockMode()) {
      const user = mockUsers.find(user => user.email === data.email && user.password === data.password);
      if (user) {
        const authToken = JSON.stringify(user); // Mock token
        const expirationTime = new Date().getTime() + 30 * 60 * 1000;
        console.log("Mock token:", authToken);
        console.log("Expiration time:", expirationTime);

        await new Promise((resolve) => setTimeout(resolve, 1500));

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
            <button type="submit" disabled={!isValid || isSubmitting} className={`block w-full text-center border py-2 rounded text-white uppercase font-medium transition ${isValid ? "bg-primary hover:bg-transparent hover:text-primary  border-primary " : "bg-gray-300 cursor-not-allowed"
              } disabled:bg-gray-300 disabled:text-white disabled:border-none`}>
              {isSubmitting ? 
              <div role="status" className="flex justify-center items-center space-x-4 -translate-x-2">
                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="text-white">Loading...</span>
              </div> : `Login`}
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
