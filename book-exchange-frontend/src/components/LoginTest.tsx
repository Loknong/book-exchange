// import  { useState } from "react";
// import { loginUser } from "../api/api";
// import { TUser } from "../models/userModel";
// export default function LoginTest() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState<TUser | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const handleLogin = async () => {
//     try {
//       const loggedInUser = await loginUser(username, password);
//       setUser(loggedInUser);
//       setError(null);
//     } catch (error) {
//       setError("Login Failed");
//       console.log("error", error);
//       setUser(null);
//     }
//   };
//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         name=""
//         id=""
//       />
//       <input
//         type="text"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         name=""
//         id=""
//       />
//       <button onClick={handleLogin}>Login</button>
//       {user && (
//         <div>
//           <h2>Welcom, {user.username}</h2>
//         </div>
//       )}
//       {error && <div className="bg-red-500 text-white"> {error}</div>}
//     </div>
//   );
// }
