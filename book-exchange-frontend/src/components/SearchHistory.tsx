import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
interface BookHistory {
  title: string;
  img: string;
}

interface Props {
  history: BookHistory[];
}
const SearchHistory = ({ history }: Props) => {
  const [historyState, setHistoryState] = useState<BookHistory[]>([]);
  useEffect(() => {
    setHistoryState(history);
  }, [history]);

  const handleDelete = (index: number) => {
    const newHistory = historyState.filter((_, i) => i !== index);
    setHistoryState(newHistory);
  };
  return (
    <div className="px-4 py-2">
      <div className="flex flex-row justify-between mb-4">
        <h3 className="font-semibold">Recent</h3>
        <h3 className="text-blue-700">See all</h3>
      </div>
      <div className="flex flex-col gap-2">
        {historyState.map((book, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <img
                src={book.img}
                alt={book.title}
                className="w-10 h-10 object-cover rounded"
              />
              <p className="text-sm text-secondary-muted">{book.title}</p>
            </div>
            <div>
              <IoMdClose
                className="text-3xl font-extralight"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
