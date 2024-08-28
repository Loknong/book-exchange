import { useState } from "react";

type Props = {}

function ExchangeBookRegular({ }: Props) {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [yourBookTitle, setYourBookTitle] = useState<string>('');
  const [yourBookCondition, setYourBookCondition] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  return (
    <form action="">
      <div>
        <label>Select a Book to Exchange:</label>
        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
          <option value="">Select a book</option>
          <option value="book1">Book 1</option>
          <option value="book2">Book 2</option>
          <option value="book3">Book 3</option>
        </select>
      </div>

      <div>
        <label>Your Book Title:</label>
        <input
          type="text"
          value={yourBookTitle}
          onChange={(e) => setYourBookTitle(e.target.value)}
          placeholder="Enter your book's title"
        />
      </div>

      <div>
        <label>Your Book Condition:</label>
        <select value={yourBookCondition} onChange={(e) => setYourBookCondition(e.target.value)}>
          <option value="">Select condition</option>
          <option value="new">New</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>
      </div>

      <div>
        <label>Message to the Owner:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional message"
        />
      </div>

      <button type="submit">Submit Exchange Offer</button>

    </form>
  )
}

export default ExchangeBookRegular