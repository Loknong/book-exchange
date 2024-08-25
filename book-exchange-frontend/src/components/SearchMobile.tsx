import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface Props  {
    searchMenu: boolean;
    toggleSearch : () => void;
}

const SearchMobile = () => {
    const [searchMenu, setSearchMenu] = useState(true)
    return (
        <div className="text-primary text-lg py-1">
            <span onClick={()=>setSearchMenu(!searchMenu)}>

                <FaSearch />
            </span>
           

        </div>
    )
}

export default SearchMobile