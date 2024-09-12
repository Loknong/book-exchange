import TestUserImage from "../../assets/profile-removebg-preview.png"

// src/mocks/userMockData.ts
export const mockUsers = [
  // {
  //   id: 1,
  //   email: "testuser@example.com",
  //   password: "111111", // You can hash this if needed
  //   role: "user",
  //   username: "testuser",
  // },
  // {
  //   id: 2,
  //   email: "admin@example.com",
  //   password: "admin123",
  //   role: "admin",
  //   username: "adminuser",
  // },
  {
    id: 1,
    name: "I'm a Test User",
    email: "testuser@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    username: "johndoe123",
    phone: "+1234567890",
    password: "111111", 
    role: "user", 
    profilePicture: TestUserImage,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    bio: "Passionate reader and book collector. Loves trading books.",
    username: "janesmith456",
    phone: "+0987654321",
    password: "password123", // Not displayed
    role: "user", // Not displayed
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    bio: "Admin account for managing the platform.",
    username: "adminuser",
    phone: "+1122334455",
    password: "admin123", // Not displayed
    role: "admin", // Not displayed
  },
];
