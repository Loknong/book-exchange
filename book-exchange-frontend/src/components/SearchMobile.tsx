import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchMobile = () => {
  // const [searchMenu, setSearchMenu] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="text-primary text-lg py-1">
      <span onClick={() => navigate("/search")}>
        <FaSearch />
      </span>
    </div>
  );
};

export default SearchMobile;

// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

// const SearchMobile = () => {
//   const [searchMenu, setSearchMenu] = useState(true);

//   return (
//     <div className="text-primary text-lg py-1">
//       <span onClick={() => setSearchMenu(!searchMenu)}>
//         <FaSearch />
//       </span>
//     </div>
//   );
// };

// export default SearchMobile;
