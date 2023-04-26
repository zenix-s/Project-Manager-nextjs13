'use client'
import { SlMenu } from "react-icons/sl";
import BreadCrumbs from "../breadcrumbs";
import Button from "../button";
import useAside from "@/hooks/useAside";
const Header = () => {

  
  const aside = useAside();

  return (
    <div className="py-3 px-2 flex justify-between">
      <BreadCrumbs />
      <div className="flex lg:hidden">
        <Button
          label=""
          theme="light"
          icon={SlMenu}
          onClick={() => {
            aside.onOpen();
          }}
          trasparent
        />
      </div>
    </div>
  );
};

export default Header;
