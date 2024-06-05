import { BookInventory } from "../../models/Books";
import { FILE_BASE_URL } from "../../api/api";

interface UserInventoryBookDetailProps {
  book: BookInventory;
}

export default function UserInventoryBookDetail({
  book,
}: UserInventoryBookDetailProps) {
  const createdAtDate = new Date(book.createAt);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <img
        src={`${FILE_BASE_URL}/books/${book.thumbnail}`}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{book.title ? book.title : "-"}</h3>
        <p className="text-sm text-gray-600">{book.author ? book.author : "-"}</p>
        <p className="text-sm text-gray-600">{book.genre ? book.genre : "-"}</p>
        <p className="text-sm text-gray-600">{book.bookCondition ? book.bookCondition : "-"}</p>
        <p className="text-sm text-gray-600">{book.description ? book.description : "-"}</p>
        <p className="text-sm text-gray-500 mt-2">Added on: {formattedDate ? formattedDate : "-"}</p>
      </div>
    </div>
  );
}
