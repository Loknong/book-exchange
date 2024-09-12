import React, { useState } from "react";
import Profile from "../assets/book.jpg";
import { useUserStore } from "../stores/userStore";

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  username: string;
  phone: string;
  profilePicture: string;
}

const ProfileInfo: React.FC = () => {

  const getAuthToken = useUserStore((state) => state.getParsedAuthToken);
  const userData = getAuthToken() as UserProfile;


  const [user, setUser] = useState<UserProfile>({
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
    username: userData.username,
    phone: userData.phone,
    profilePicture: Profile,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setNewProfilePicture(file);
  };

  const handleSave = () => {
    // You would handle saving the new profile data here
    if (newProfilePicture) {
      // Handle the profile picture upload
      // This is a placeholder and you should handle the upload as per your app's logic
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: URL.createObjectURL(newProfilePicture),
      }));
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-xl mx-auto">
      {isEditing ? (
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {newProfilePicture && (
              <img
                src={URL.createObjectURL(newProfilePicture)}
                alt="New Profile"
                className="mt-4 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none  focus:border-primary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none  focus:border-primary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none  focus:border-primary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none  focus:border-primary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none  focus:border-primary p-2 rounded-md"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-600 mt-2">Email: {user.email}</p>
          <p className="text-gray-600">Phone: {user.phone}</p>
          <p className="text-gray-600 mt-4">{user.bio}</p>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-primary text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-primary border border-primary"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
