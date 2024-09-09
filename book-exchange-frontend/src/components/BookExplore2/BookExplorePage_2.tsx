import { useEffect, useState } from "react"
import { BookCard } from "../../models/Books";
import axios from "axios";


interface BooksCard {
    title: string;
}

const BookExplorePage_2 = () => {
const [booksList, setBookList] = useState<BookCard[]>()
    useEffect(() => {
      
    const fetchBooks = async () => {
        const response = await axios.get("")
    }
     
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default BookExplorePage_2
