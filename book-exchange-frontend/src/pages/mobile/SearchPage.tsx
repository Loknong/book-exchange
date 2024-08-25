import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'


const SearchPage = () => {
    const [searchMenu, setSearchMenu] = useState(true)
    return (
        <div className="text-primary text-lg py-1">
            <span onClick={() => setSearchMenu(!searchMenu)}>

                <FaSearch />
            </span>


        </div>
    )
}

export default SearchPage