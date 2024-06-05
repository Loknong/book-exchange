import React, { useState } from "react";
import { loginUser } from "../../api/api";
import { useUserStore } from "../../stores/useUserStore";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user?.username);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, userPassword);
      console.log("Res Info",user);
      
      if (response.user) {
        
        setUser(response.user);
        setError(null);
        // Need redirect if success
        navigate("/user");
      } else{
        setError('Error')
      }
    } catch (err) {
      setUser(null);
      if (err instanceof AxiosError) {
        console.error("Login Failed", err);
        setError(err.response?.data.message || "An error occured");
      } else {
        console.error("An unexpected eorr ouccurred");
      }
    }
  };
  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-500">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-2 my-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-500">
            Password
          </label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 my-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>
      </form>

      <div className="py-5 max-w-lg mx-auto">
        {user && <div className="bg-green-400 text-white">Welcome, {user}</div>}
        {error && <div className="bg-red-500 text-white">{error}</div>}
      </div>
    </div>
  );
}
