// import axios from "axios";
// import { IUserOffer } from "../models/userAction";
// import { User } from "../models/userModel";

// const API_BASE_URL = "http://localhost:3003/api";
// export const FILE_BASE_URL = "http://localhost:3003/uploads";

// //!-------------------------- User Auth --------------------------

// //* Login
// export const loginUser = async (username: string, password: string) => {
//   const response = await axios.post(`${API_BASE_URL}/users/auth/login`, {
//     username,
//     password,
//   });
//   return response.data;
// };

// //* Signup
// export const signupUser = async (user: Partial<User>) => {
//   const response = await axios.post(`${API_BASE_URL}/users`, user);
//   console.log("Signup success", response.data);
//   return response.data;
// };
// //! //////////////////////////////////////////////////////////////

// //!-------------------------- Book API --------------------------

// //* Add Book
// export const addBook = async (formData: FormData) => {
//   console.log("formData", formData);

//   const response = await axios.post(`${API_BASE_URL}/books/add`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   console.log(response.data);
//   return response.data;
// };

// //* View Book Detail
// export const fetchBookById = async (bookId: number) => {
//   const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
//   return response.data;
// };

// //* View All Book
// export const fetchBookList = async () => {
//   const response = await axios.get(`${API_BASE_URL}/books`);
//   console.log(response.data);
//   return response.data;
// };

// //* View User Inventory (user book)
// export const fetchUserInventory = async (userId: string) => {
//   const response = await axios.get(
//     `${API_BASE_URL}/action/inventory/${userId}`
//   );
//   console.log(response.data);
//   return response.data;
// };
// //! //////////////////////////////////////////////////////////////

// //!-------------------------- User Action API --------------------------

// //* User Make Offer
// export const offerBook = async (userOffer: IUserOffer) => {
//   const response = await axios.post(`${API_BASE_URL}/offers`, { userOffer });
//   console.log(response.data);
//   return response.data;
// };

// //! //////////////////////////////////////////////////////////////
