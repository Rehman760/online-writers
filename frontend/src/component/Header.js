import React from "react";
import headerImage from "../images/jobbg.jpg";
import SearchInputEl from "./SearchInputEl";

const Header = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-[400px] bg-cover bg-center bg-midNightBlue"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <SearchInputEl />
      </div>
    </>
  );
};

export default Header;
