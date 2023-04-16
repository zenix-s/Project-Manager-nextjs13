'use client'
import { SlMenu } from "react-icons/sl";
import BreadCrumbs from "../breadcrumbs";

const Header = () => {

  


  return (
    <header className="py-3 px-2">
      <BreadCrumbs />
      <div>
        <button
          className="sidebar-action-button"
          onClick={() => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar) sidebar.classList.toggle("show-aside");
          }}
        >
          <SlMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
