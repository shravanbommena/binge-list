/* eslint-disable react/prop-types */
// const appliedStyles = "w-full lg:max-w-screen-lg xl:max-w-screen-xl";

import { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (props) => {
  const [searchInput, setSearchInput] = useState("");
  // console.log(props);

  const { history } = props;
  const handleSearchClick = () => {
    // console.log(history);
    setSearchInput("");
    history.push(`/search/${searchInput}`);
  };

  return (
    <nav className="w-full backdrop-blur-sm flex justify-center items-center text-white h-14 md:h-20 absolute z-[100] ">
      <div className="container flex justify-between items-center px-2 lg:px-4">
        <h1 className="font-semibold text-base md:text-2xl cursor-pointer">
          <Link to="/">Movie Tracker</Link>
        </h1>
        <div className="flex items-center justify-center">
          <ul className="hidden md:flex justify-center items-center mx-auto gap-4 xl:gap-7 text-base md:text-xl font-medium cursor-pointer">
            <li className="">Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
          </ul>
          <div className="flex justify-center items-center ml-4">
            <button
              type="button"
              className="cursor-pointer mr-3"
              onClick={handleSearchClick}
            >
              <FcSearch className="text-xl" />
            </button>
            <button type="button" className="cursor-pointer md:hidden mr-2">
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
