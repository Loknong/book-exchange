import React, { useEffect, useState } from "react";
import { AddressApi } from "../hooks/useAddressApi";
import { useUserStore } from "../stores/userStore";

interface Address {
  id: number;
  userId: number;
  houseNumber: string;
  village: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface AddressData {
  message: string;
  data: Address[];
}

interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

const AddressPage: React.FC = () => {
  const { userId } = useUserStore(); // Get the userId from the Zustand store
  useEffect(() => {
    if (!userId) {
      initializeUser(); // Initialize user from token if not already set
    }
  }, [userId, initializeUser]);
  const [addressMode, setAddressMode] = useState<string>("Full"); // State to manage selected mode
  const api = new AddressApi<ApiResponse<AddressData>>(
    "/api/users/address/list"
  );

  const { data, loading, error } = api.fetchList({
    userId: userId as number,
    addressMode,
  });

  const handleSelectMode = (mode: string) => {
    setAddressMode(mode); // Update the addressMode state, triggering a re-render
  };

  return (
    <div className="p-10">
      <h2>User Addresses</h2>
      <h2> UserId: {userId}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!error && (
        <select
          name="addressMode"
          id="addressMode"
          onChange={(e) => handleSelectMode(e.target.value)}
          value={addressMode}
        >
          <option value="Full">Full</option>
          <option value="Partial">Partial</option>
        </select>
      )}
      {data?.data?.data?.length ? (
        <ul>
          {data.data.data.map((address) => (
            <ul className="my-4" key={address.id}>
              {Object.entries(address).map(([key, value]) => (
                <li className="list-decimal" key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          ))}
        </ul>
      ) : (
        <p>No addresses found</p>
      )}
    </div>
  );
};

export default AddressPage;
function initializeUser() {
  throw new Error("Function not implemented.");
}
