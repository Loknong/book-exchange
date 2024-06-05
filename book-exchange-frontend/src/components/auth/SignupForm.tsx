import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/api";
import { AxiosError } from "axios";
import { User } from "../../models/userModel";

export default function SignupForm() {
  const [username, setUsername] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const user = await signupUser({ username, userPassword, email, firstName, lastName } as Partial<User>);
      console.log(user);
      
      setSuccess(user.username);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(null);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "An error occurred");
        console.log(err.response?.data.message);
      } else {
        setError("Unexpected error");
        console.log("Unexpected error");
      }
    }
  };

  return (
    <div className="my-20">
      <form
        onSubmit={handleSubmit}
        action=""
        className="max-w-md mx-auto px-4 py-4 rounded shadow-md"
      >
        <div className="">Signup Form</div>
        <div className="my-4">
          <label htmlFor="firstName" className="block my-2 text-gray-500">
            First Name
          </label>
          <input
            className="w-full px-4 py-2 rounded border"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="lastName" className="block my-2 text-gray-500">
            Last Name
          </label>
          <input
            className="w-full px-4 py-2 rounded border"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="username" className="block my-2 text-gray-500">
            Username
          </label>
          <input
            className="w-full px-4 py-2 rounded border"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="email" className="block my-2 text-gray-500">
            Email
          </label>
          <input
            className="w-full px-4 py-2 rounded border"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="block my-2 text-gray-500">
            Password
          </label>
          <input
            className="w-full px-4 py-2 rounded border"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded mt-6 my-2"
        >
          Sign up
        </button>
      </form>
      <div>
        {error && <div className="bg-red-500 text-white">{error}</div>}
        {success && (
          <div className="bg-green-400 text-white">
            Thanks for signing up, {success}
          </div>
        )}
      </div>
    </div>
  );
}
