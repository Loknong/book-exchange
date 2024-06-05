import { useEffect, useState } from "react";
import { fetchUserInventory } from "../../api/api";
import UserInventoryBookDetail from "./UserInventoryBookDetail";
import { BookInventory } from "../../models/Books";
import { useUserStore } from "../../stores/useUserStore";

export default function UserInventory() {
  const [userBookList, setUserBookList] = useState<BookInventory[]>([]);
  const userId = useUserStore((state) => state.user?.userId);
  const userId2 = userId + "";
  console.log("UserId", userId);
  console.log("userId2", userId2);

  const handleFetch = async () => {
    const res = await fetchUserInventory(userId2);
    console.log("res", res);
    setUserBookList(res);
  };

  useEffect(() => {
    handleFetch();
  }, );

  useEffect(() => {
    console.log("user", userBookList);
  }, [userBookList]);

  return (
    <>
      <div className="bg-green-300 flex flex-col items-center">
        <div className="self-start">UserInventory</div>
        <div className="w-3/4 flex flex-row items-center">
          <div className="bg-white rounded-md shadow w-full min-h-12 my-4 mx-2 border border-orange-500">
            search Area
          </div>
          <button className="mx-2 px-5 py-3 rounded text-white font-semibold bg-orange-500">
            {" "}
            Search
          </button>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-10 py-5  ">
          {userBookList.map((book, key) => (
            <div key={key} className="hover:cursor-pointer">
              <UserInventoryBookDetail book={book} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
